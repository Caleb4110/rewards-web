import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Reward from "../components/Reward";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserDashboardData, useReward } from "../services/message.service";
import LogoutButton from "../components/buttons/LogoutButton";
import Button from "../components/buttons/Button";

interface Props {}

interface DashboardReward {
  id: number;
  cafeId: number;
  cafeName: string;
  isValid: boolean;
}

export default function UserDashboard() {
  const [rewards, setRewards] = useState<DashboardReward[]>([]);
  const { user, getAccessTokenSilently, loginWithPopup, isLoading, logout } =
    useAuth0();
  const [accessToken, setAccessToken] = useState<any | null>(null);

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
        returnTo: "http://localhost:5173/auth/dashboard",
      },
    });
  };

  return (
    <div className="flex h-screen w-screen flex-col space-y-4 overflow-y-auto bg-snow p-5 text-3xl text-raisin_black">
      <header className="flex items-center space-x-4">
        <div className="w-5/6">
          <Heading
            variant="primary"
            position="center"
            title="AVAILABLE REWARDS"
          />
          <Heading
            variant="secondary"
            position="center"
            title="NOTE: Staff member must click on reward to use it"
          />
        </div>
        <Button
          className="w-32 h-16 text-lg"
          onClick={handleLogout}
          label="LOGOUT"
          variant="secondary"
        />
      </header>
      {rewards.map((reward, index) => {
        return (
          <Reward
            id={reward.id.toString()}
            key={index}
            cafeName={reward.cafeName}
            isValid={reward.isValid}
            onUse={buttonHandler}
          />
        );
      })}
    </div>
  );
}
