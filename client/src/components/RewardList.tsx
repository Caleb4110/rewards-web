import Reward from "./Reward";
import { DashboardReward } from "../types/user";
import Heading from "./Heading";

interface Props {
  rewards: DashboardReward[];
  buttonHandler: (e: any) => void;
}

export default function RewardList({ rewards, buttonHandler }: Props) {
  if (rewards.length == 0) {
    return (
      <Heading variant="primary" position="center" title="NO REWARDS FOUND" />
    );
  }

  return (
    <div className="flex flex-col space-y-2 overflow-y-auto">
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
