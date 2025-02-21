interface Props {
  variant: "primary" | "secondary" | "minimal";
  Icon?: React.ComponentType;
  label?: string;
  onClick?: ((e: any) => void) | (() => void);
  onDoubleClick?: ((e: any) => void) | (() => void);
  disabled?: boolean;
  className?: string;
  id?: string;
  hoverTitle?: string;
  type?: "submit" | "reset" | "button";
}

export default function Button({
  variant,
  Icon,
  label,
  onClick,
  onDoubleClick,
  disabled = false,
  className = "",
  id,
  hoverTitle,
  type,
}: Props) {
  const bgColour =
    variant === "primary"
      ? "bg-moss_green-400"
      : variant === "secondary"
        ? "bg-moss_green-500"
        : "bg-red-800";

  return (
    <button
      id={id}
      title={hoverTitle && hoverTitle}
      onClick={onClick && onClick}
      onDoubleClick={onDoubleClick && onDoubleClick}
      disabled={disabled}
      type={type}
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
