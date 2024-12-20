import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Reward from "../components/Reward";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {}

interface DashboardReward {
  id: number;
  cafeId: number;
  rewardCount: number;
  name: string;
}

export default function UserDashboard() {
  const [rewards, setRewards] = useState<DashboardReward[]>([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  /*
  useEffect(() => {
    const fetchRewards = async () => {
      const res = await axios.get("https://localhost/api/rewards/all", {
        params: {
          userId: "1",
        },
        withCredentials: true,
      });

      setRewards(res.data);
    };

    fetchRewards();
  }, []);
*/
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="flex h-screen w-screen flex-col space-y-4 overflow-y-auto bg-snow p-5 text-3xl text-raisin_black">
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
        <Reward />
      </div>
    )
  );
}
