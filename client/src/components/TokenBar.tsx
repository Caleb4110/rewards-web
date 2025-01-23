import Token from "./Token";

interface Props {
  total: number;
  rewardCount: number;
}

export default function TokenBar({ rewardCount, total }: Props) {
  return (
    <div className="flex flex-wrap place-content-center">
      {[...Array(total)].map((_, i) => (
        <Token key={i} index={i + 1} isUsed={rewardCount > i ? true : false} />
      ))}
    </div>
  );
}
