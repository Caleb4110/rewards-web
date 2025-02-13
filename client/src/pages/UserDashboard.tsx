import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserDashboardData, useReward } from "../services/api.service";
import Button from "../components/Button";
import RewardList from "../components/RewardList";
import { DashboardReward } from "../types/user";
import PageLoader from "../components/PageLoader";

import { useErrorBoundary } from "react-error-boundary";
const clientUrl = import.meta.env.VITE_AUTH0_CLIENT_URL;

interface Props {
  cafeId?: string;
}

export default function UserDashboard({ cafeId }: Props) {
  const [rewards, setRewards] = useState<DashboardReward[]>([]);
  const { user, isAuthenticated, getAccessTokenSilently, isLoading, logout } =
    useAuth0();
  const { showBoundary } = useErrorBoundary();

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
      <div className="flex h-screen w-screen flex-col space-y-4 overflow-y-auto p-5 text-3xl text-raisin_black">
        <header className="flex items-center space-x-4">
          <div className="w-5/6">
            <Heading
              variant="primary"
              position="center"
              title="AVAILABLE REWARDS"
            />
          </div>
          <Button
            className="w-32 h-16"
            onClick={handleLogout}
            label="LOGOUT"
            variant="secondary"
          />
        </header>
        <Heading
          variant="secondary"
          position="center"
          title="NOTE: Staff member must click on reward to use it"
        />
        <RewardList rewards={rewards} buttonHandler={buttonHandler} />
      </div>
    )
  );
}
