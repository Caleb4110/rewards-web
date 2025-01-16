interface Props {
  variant: "primary" | "secondary" | "disabled";
  Icon?: React.ComponentType;
  label?: string;
  onClick?: ((e: any) => void) | (() => void);
  disabled?: boolean;
  className?: string;
  id?: string;
}

export default function Button({
  variant,
  Icon,
  label,
  onClick,
  disabled = false,
  className = "",
  id,
}: Props) {
  const bgColour =
    variant === "primary" ? "bg-moss_green-400" : "bg-moss_green-500";

  return (
    <button
      id={id}
      onClick={onClick && onClick}
      disabled={disabled}
      className={
        "w-full rounded-md p-4 text-snow shadow-sm shadow-moss_green-500/80 hover:bg-moss_green-300 active:bg-moss_green-200 disabled:bg-neutral-300 disabled:text-neutral-400 disabled:shadow-neutral-400/80 disabled:cursor-not-allowed " +
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
