import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserDashboardData, useReward } from "../services/api.service";
import Button from "../components/Button";
import RewardList from "../components/RewardList";
import { DashboardReward } from "../types/user";
import PageLoader from "../components/PageLoader";

import { useErrorBoundary } from "react-error-boundary";
import Popup from "../components/Popup";
import BugForm from "../components/BugForm";
const clientUrl = import.meta.env.VITE_AUTH0_CLIENT_URL;

interface Props {
  cafeId?: string;
}

export default function UserDashboard({ cafeId }: Props) {
  const [rewards, setRewards] = useState<DashboardReward[]>([]);
  const { user, isAuthenticated, getAccessTokenSilently, isLoading, logout } =
    useAuth0();
  const { showBoundary } = useErrorBoundary();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.sub) return;

    const getUserData = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        localStorage.setItem("accessToken", accessToken);

        const { data } = await getUserDashboardData(
          user.sub!,
          cafeId || "auth0|67885176fbd7752104ce68c7",
        );
        setRewards(data);
      } catch (error: any) {
        showBoundary(error);
      }
    };

    getUserData();
  }, [user?.sub]);

  const buttonHandler = (e: any) => {
    const redeemReward = async () => {
      try {
        // Update reward in database
        await useReward(e.target.id);

        // Find index of reward locally
        const tempRewards = [...rewards];
        const index = tempRewards.findIndex(
          (reward) => reward.id == e.target.id,
        );

        if (index < 0) {
          throw new Error("There was an issue redeeming your reward");
        }

        // Update reward locally
        const updatedReward = tempRewards[index];
        updatedReward.isValid = false;
        tempRewards.splice(index, 1);
        tempRewards.push(updatedReward);
        setRewards(tempRewards);
      } catch (error: any) {
        showBoundary(error);
      }
    };
    redeemReward();
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: `${clientUrl}auth/dashboard`,
      },
    });
  };
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    isAuthenticated &&
    rewards && (
      <div className="flex h-screen w-screen flex-col">
        <Popup
          isOpen={isOpen}
          closePopup={() => setIsOpen(false)}
          element={<BugForm />}
        />
        <div className="flex h-full w-full flex-col space-y-4 overflow-y-auto p-5 text-3xl text-raisin_black">
          <header className="flex  space-x-4">
            <Button
              variant="minimal"
              onClick={() => setIsOpen(true)}
              label="REPORT A BUG"
              className="w-1/2 text-lg"
            />

            <Button
              className="w-1/2 text-lg"
              onClick={handleLogout}
              label="LOGOUT"
              variant="secondary"
            />
          </header>
          <div>
            <Heading
              variant="primary"
              position="center"
              title="AVAILABLE REWARDS"
            />
          </div>
          <Heading
            variant="secondary"
            position="center"
            title="NOTE: Staff member must double click on reward to use it"
            className="text-red-700"
          />
          <RewardList rewards={rewards} buttonHandler={buttonHandler} />
        </div>
      </div>
    )
  );
}
