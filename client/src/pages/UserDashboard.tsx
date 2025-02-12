import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Reward from "../components/Reward";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserDashboardData, useReward } from "../services/message.service";
import Button from "../components/Button";
import RewardList from "../components/RewardList";
import { DashboardReward } from "../types/user";
import PageLoader from "../components/PageLoader";

interface Props {
  cafeId?: string;
}

export default function UserDashboard({ cafeId }: Props) {
  const [rewards, setRewards] = useState<DashboardReward[]>([]);
  const { user, getAccessTokenSilently, loginWithPopup, isLoading, logout } =
    useAuth0();
  const [accessToken, setAccessToken] = useState<any | null>(null);

  const clientUrl = import.meta.env.VITE_AUTH0_CLIENT_URL;

  // TODO: Check if redirect or login with popup is better OR if the authenticationGuard does this for us
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
      const { data, error } = await getUserDashboardData(
        accessToken,
        user?.sub,
        cafeId || "auth0|67885176fbd7752104ce68c7",
      );

      if (data) {
        setRewards(data);
      }

      // TODO: HANDLE ERRRORS
      else if (error) {
        console.log(error);
      }
    };

    getMessage();
  }, [accessToken]);

  const buttonHandler = (e: any) => {
    const use = async () => {
      const { data, error } = await useReward(accessToken, e.target.id);

      if (data) {
        const tempRewards = [...rewards];
        const index = tempRewards.findIndex(
          (reward) => reward.id == e.target.id,
        );
        if (index >= 0) {
          const updatedReward = tempRewards[index];
          updatedReward.isValid = false;

          tempRewards.splice(index, 1);
          tempRewards.push(updatedReward);
          setRewards(tempRewards);
        }
      }

      // TODO: HANDLE ERRRORS
      else if (error) {
        console.log(error);
      }
    };
    use();
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: `${clientUrl}auth/dashboard`,
      },
    });
  };
  if (!rewards || isLoading) {
    return <PageLoader />;
  }
  return (
    <div className="flex h-screen w-screen flex-col space-y-4 overflow-y-auto bg-snow p-5 text-3xl text-raisin_black">
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
  );
}
