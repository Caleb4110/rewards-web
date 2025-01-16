import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DbUser_t, WebUser_t, months, ageMap, visitMap } from "../types/user";
import UserList from "../components/UserList";
import FilterBar from "../components/FilterBar";
import Bars from "../components/svg/Bars";
import axios from "axios";
import Button from "../components/buttons/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { getCafeDashboardData } from "../services/message.service";

interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
}

interface Filter {
  id: string;
  title: string;
  shown: boolean;
  opts: FilterOption[];
}

export default function CafeDashboard() {
  // Authentication stuff
  const [accessToken, setAccessToken] = useState<any | null>(null);
  const { user, getAccessTokenSilently, loginWithPopup, isLoading } =
    useAuth0();

  // Data variables
  const [data, setData] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<WebUser_t[]>([]);

  // Filtering variables
  const [searchLoc, setSearchLoc] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  // Get access token for requesting server data on page load
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (error: any) {
        if (
          error.error === "login_required" ||
          error.error === "consent_required"
        ) {
          loginWithPopup();
        }
        throw error;
      }
    };
    if (!isLoading) {
      getToken();
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    // TODO: Fetch cafe id on login
    const getMessage = async () => {
      const { data, error } = await getCafeDashboardData(
        accessToken,
        user?.sub,
      );

      if (data) {
        setData(JSON.parse(data.text));
        setFilterData(JSON.parse(data.text));
      }

      // TODO: HANDLE ERRRORS
      if (error) {
        console.log(error);
      }
    };

    getMessage();
  }, [accessToken]);

  // Selects all users displayed
  const handleSelectAll = () => {
    let tempFilterData = [...filterData];
    tempFilterData.forEach((user) => (user.isSelected = true));

    setFilterData(tempFilterData);
  };

  // Handles selecting a user
  const handleSelect = (event: any) => {
    let tempFilterData = [...filterData];
    const phoneNum = event.target.value;
    const index = tempFilterData.findIndex(
      (usr) => usr.phoneNumber === phoneNum,
    );
    tempFilterData[index].isSelected = !tempFilterData[index].isSelected;
    setFilterData(tempFilterData);
  };

  // Handles a location search when location filter is selected
  const handleSearchLoc = (e: any) => {
    e.preventDefault();
    setSearchLoc(e.target.value);
  };

  const handleCopy = () => {
    let numbers: string = "";
    filterData.forEach((user) => {
      if (user.isSelected) {
        numbers += user.phoneNumber + ",";
      }
    });

    navigator.clipboard.writeText(numbers);
  };

  type monthsKey = keyof typeof months;

  const [filters, setFilters] = useState<Filter[]>([
    {
      id: "birth month",
      title: "BIRTH MONTH",
      shown: false,
      opts: [
        { value: "jan", label: "Jan", checked: false },
        { value: "feb", label: "Feb", checked: false },
        { value: "mar", label: "Mar", checked: false },
        { value: "apr", label: "Apr", checked: false },
        { value: "may", label: "May", checked: false },
        { value: "jun", label: "Jun", checked: false },
        { value: "jul", label: "Jul", checked: false },
        { value: "aug", label: "Aug", checked: false },
        { value: "sep", label: "Sep", checked: false },
        { value: "oct", label: "Oct", checked: false },
        { value: "nov", label: "Nov", checked: false },
        { value: "dec", label: "Dec", checked: false },
      ],
    },
    {
      id: "age",
      title: "AGE",
      shown: false,
      opts: [
        { value: "18-24", label: "18-24", checked: false },
        { value: "25-34", label: "25-34", checked: false },
        { value: "35-44", label: "35-44", checked: false },
        { value: "45-54", label: "45-64", checked: false },
        { value: "55-64", label: "55-64", checked: false },
        { value: "65+", label: "65+", checked: false },
      ],
    },
    {
      id: "visit count",
      title: "VISIT COUNT",
      shown: false,
      opts: [
        { value: "0-9", label: "0-9", checked: false },
        { value: "10-19", label: "10-19", checked: false },
        { value: "20-29", label: "20-29", checked: false },
        { value: "30+", label: "30+", checked: false },
      ],
    },
  ]);

  // Handles the filtering when an option is changed
  useEffect(() => {
    // Data that is used for the filtering
    let tempData: WebUser_t[] = data;

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
            const newData = tempData.filter(
              (data) => data.dob.getMonth() === birthMonth,
            );
            dobData = dobData.concat(newData);
          }
        });
        // This sets the new filtered data as the temp data for the other filters
        if (hasActiveFilter) {
          tempData = dobData;
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
              const newData = tempData.filter(
                (data) => data.age >= ageRange[0] && data.age <= ageRange[1],
              );
              ageData = ageData.concat(newData);
            }
          }
        });

        // This sets the new filtered data as the temp data for the other filters
        if (hasActiveFilter) {
          tempData = ageData;
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
              const newData = tempData.filter(
                (data) =>
                  data.rewardCount >= visitRange[0] &&
                  data.rewardCount <= visitRange[1],
              );
              visitData = visitData.concat(newData);
            }
          }
        });

        // This sets the new filtered data as the temp data for the other filters
        if (hasActiveFilter) {
          tempData = visitData;
          hasActiveFilter = false;
        }
      }
    });

    // Filter out locations that don't match the searched location
    if (searchLoc !== "") {
      tempData = tempData.filter(function (data) {
        return data.location.toLowerCase().indexOf(searchLoc) > -1;
      });
    }

    // Finally, set the filtered data to the new filtered data
    setFilterData(tempData);
  }, [filters, searchLoc]);

  useEffect(() => {
    setFilterData(data);
  }, [data]);

  interface AuthContextType {
    token: any;
    login: (phoneNumber: string, password: string) => void;
    logOut: () => void;
  }

  const handleFilterChange = (updatedFilters: Filter[]) => {
    setFilters(updatedFilters);
  };

  const handleOpen = () => {
    setOpen((open) => !open);
  };

  return (
    <div className="flex h-screen w-screen flex-col space-y-4 overflow-y-auto bg-snow p-5 text-3xl text-raisin_black">
      <div className="flex space-x-2">
        <Button
          onClick={handleOpen}
          variant="primary"
          Icon={Bars}
          className="w-auto"
        />

        <input
          className="box-border h-full w-full rounded-md p-2 text-xl"
          type="search"
          placeholder="SEARCH A SUBURB..."
          onChange={handleSearchLoc}
        />
      </div>

      <div
        className={`fixed top-16 flex transition-opacity ease-in-out ${open ? "opacity-100" : "opacity-0"}`}
      >
        {open ? (
          <FilterBar filters={filters} onChange={handleFilterChange} />
        ) : null}
      </div>

      <div className="">
        <Button
          onClick={handleSelectAll}
          variant="primary"
          label="SELECT ALL"
        />
      </div>

      <div className="box-border h-full overflow-auto rounded-md">
        <UserList users={filterData} onChange={handleSelect} />
      </div>

      <div className="">
        <Button
          onClick={handleCopy}
          variant="primary"
          label="COPY PHONE NUMBERS"
        />
      </div>
    </div>
  );
}
