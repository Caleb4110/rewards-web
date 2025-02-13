import { useEffect, useState } from "react";
import { WebUser_t, months, ageMap, visitMap } from "../types/user";
import UserList from "../components/UserList";
import FilterBar from "../components/FilterBar";
import Bars from "../components/svg/Bars";
import Button from "../components/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { getCafeDashboardData } from "../services/api.service";
import PageLoader from "../components/PageLoader";
import { Filter, cafeFilters } from "../models/cafePageModels";
import { useErrorBoundary } from "react-error-boundary";
const clientUrl = import.meta.env.VITE_AUTH0_CLIENT_URL;

export default function CafeDashboard() {
  const { user, getAccessTokenSilently, isLoading, isAuthenticated, logout } =
    useAuth0();

  const { showBoundary } = useErrorBoundary();

  // Data variables
  const [customers, setCustomers] = useState<any[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<WebUser_t[]>([]);

  // Filtering variables
  const [searchLoc, setSearchLoc] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.sub) return;

    const getDashboardData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        localStorage.setItem("accessToken", accessToken);

        const { data } = await getCafeDashboardData(user?.sub!);

        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error: any) {
        showBoundary(error);
      }
    };

    getDashboardData();
  }, [user?.sub]);

  // Selects all users displayed
  const handleSelectAll = () => {
    let tempFilteredCustomers = [...filteredCustomers];
    tempFilteredCustomers.forEach((customer) => (customer.isSelected = true));

    setFilteredCustomers(tempFilteredCustomers);
  };

  // Handles selecting a user
  const handleSelect = (event: any) => {
    let tempFilterData = [...filteredCustomers];
    const phoneNum = event.target.value;
    const index = tempFilterData.findIndex(
      (customer) => customer.phoneNumber === phoneNum,
    );
    tempFilterData[index].isSelected = !tempFilterData[index].isSelected;
    setFilteredCustomers(tempFilterData);
  };

  // Handles a location search when location filter is selected
  const handleSearchLoc = (e: any) => {
    e.preventDefault();
    setSearchLoc(e.target.value);
  };

  const handleCopy = () => {
    let numbers: string = "";
    filteredCustomers.forEach((customer) => {
      if (customer.isSelected) {
        numbers += customer.phoneNumber + ",";
      }
    });

    navigator.clipboard.writeText(numbers);
  };

  type monthsKey = keyof typeof months;

  const [filters, setFilters] = useState<Filter[]>(cafeFilters);

  // Handles the filtering when an option is changed
  useEffect(() => {
    // Data that is used for the filtering
    let tempCustomers: WebUser_t[] = customers;

    // Records of each filter step
    let dobData: WebUser_t[] = [];
    let ageData: WebUser_t[] = [];
    let visitData: WebUser_t[] = [];

    // Iterate through each filter type
    let hasActiveFilter = false;
    filters.forEach((filter) => {
      if (filter.id === "birth month") {
        // Iterate through each filter option
        filter.opts.forEach((option) => {
          // If the option has been checked, filter the data
          if (option.checked) {
            hasActiveFilter = true;
            const key: monthsKey = option.value as monthsKey;
            const birthMonth = months[key];
            const newData = tempCustomers.filter(
              (data) => data.dob.getMonth() === birthMonth,
            );
            dobData = dobData.concat(newData);
          }
        });
        // This sets the new filtered data as the temp data for the other filters
        if (hasActiveFilter) {
          tempCustomers = dobData;
          hasActiveFilter = false;
        }
      } else if (filter.id === "age") {
        // Iterate through each filter option
        filter.opts.forEach((option) => {
          // if the option has been checked, filter the data
          if (option.checked) {
            hasActiveFilter = true;
            const ageRange = ageMap.get(option.value);
            if (ageRange) {
              const newData = tempCustomers.filter(
                (data) => data.age >= ageRange[0] && data.age <= ageRange[1],
              );
              ageData = ageData.concat(newData);
            }
          }
        });

        // This sets the new filtered data as the temp data for the other filters
        if (hasActiveFilter) {
          tempCustomers = ageData;
          hasActiveFilter = false;
        }
      } else if (filter.id === "visit count") {
        // Iterate through each filter option
        filter.opts.forEach((option) => {
          // if the option has been checked, filter the data
          if (option.checked) {
            hasActiveFilter = true;
            const visitRange = visitMap.get(option.value);
            if (visitRange) {
              const newData = tempCustomers.filter(
                (data) =>
                  data.visitCount >= visitRange[0] &&
                  data.visitCount <= visitRange[1],
              );
              visitData = visitData.concat(newData);
            }
          }
        });

        // This sets the new filtered data as the temp data for the other filters
        if (hasActiveFilter) {
          tempCustomers = visitData;
          hasActiveFilter = false;
        }
      }
    });

    // Filter out locations that don't match the searched location
    if (searchLoc !== "") {
      tempCustomers = tempCustomers.filter(function (data) {
        return data.suburb.toLowerCase().indexOf(searchLoc) > -1;
      });
    }

    // Finally, set the filtered data to the new filtered data
    setFilteredCustomers(tempCustomers);
  }, [filters, searchLoc]);

  const handleFilterChange = (updatedFilters: Filter[]) => {
    setFilters(updatedFilters);
  };

  const handleOpen = () => {
    setOpen((open) => !open);
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: `${clientUrl}auth/cafe`,
      },
    });
  };
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    isAuthenticated &&
    filteredCustomers && (
      <div className="flex h-screen w-screen flex-col space-y-4 overflow-y-auto p-5 text-3xl text-raisin_black">
        <div className="flex space-x-2 w-full">
          <Button variant="primary" onClick={handleLogout} label="LOGOUT" />
        </div>

        <div className="flex w-full space-x-2">
          <Button
            onClick={handleOpen}
            variant="primary"
            Icon={Bars}
            className="flex-none w-16"
            hoverTitle="Open filters"
          />

          <input
            className="box-border h-full w-full rounded-md p-2 text-xl"
            type="search"
            placeholder="SEARCH A SUBURB..."
            onChange={handleSearchLoc}
          />
        </div>

        <div
          className={`fixed top-40 flex transition-opacity ease-in-out ${open ? "opacity-100" : "opacity-0"}`}
        >
          {open ? (
            <FilterBar filters={filters} onChange={handleFilterChange} />
          ) : null}
        </div>

        <div>
          <Button
            onClick={handleSelectAll}
            variant="primary"
            label="SELECT ALL"
          />
        </div>

        <div className="box-border h-full overflow-auto rounded-md">
          <UserList users={filteredCustomers} onChange={handleSelect} />
        </div>

        <div>
          <Button
            onClick={handleCopy}
            variant="primary"
            label="COPY PHONE NUMBERS"
          />
        </div>
      </div>
    )
  );
}
