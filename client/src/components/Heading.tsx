interface Props {
  variant: "primary" | "secondary";
  position: "left" | "center" | "right";
  title: string;
  className?: string;
}

export default function Heading({
  variant,
  position,
  title,
  className,
}: Props) {
  const textColour =
    variant === "primary"
      ? "text-moss_green-400 text-3xl"
      : "text-moss_green-500 text-2xl";
  const textPosition =
    position === "center"
      ? "text-center"
      : position === "right"
        ? "text-right"
        : "text-left";

  return (
    <div
      className={"w-full " + className + " " + textColour + " " + textPosition}
    >
      {title}
    </div>
  );
}
