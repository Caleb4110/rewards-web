interface Props {
  isUsed: boolean;
  index: number;
}

export default function Token({ isUsed, index }: Props) {
  const colour = isUsed
    ? "bg-moss_green-400 shadow-2xl text-snow"
    : "border border moss-green animate-pulse";

  return (
    <div
      className={
        "m-2 flex size-16 items-center justify-center rounded-full " + colour
      }
    >
      {index}
    </div>
  );
}
