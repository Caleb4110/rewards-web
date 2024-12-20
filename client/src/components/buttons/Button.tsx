interface Props {
  variant: "primary" | "secondary";
  Icon?: React.ComponentType;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  variant,
  Icon,
  label,
  onClick,
  disabled = false,
  className = "",
}: Props) {
  const bgColour =
    variant === "primary" ? "bg-moss_green-400" : "bg-moss_green-500";

  return (
    <button
      onClick={onClick && onClick}
      disabled={disabled}
      className={
        "w-full rounded-md p-4 text-snow shadow-sm shadow-moss_green-500/80 hover:bg-moss_green-300 active:bg-moss_green-200 disabled:bg-moss_green-600 " +
        className +
        " " +
        bgColour
      }
    >
      {Icon && <Icon />}
      {label && label}
    </button>
  );
}
