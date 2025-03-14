import Button from "./Button";
import Heading from "./Heading";

interface Props {
  id: string;
  cafeName: string;
  isValid: boolean;
  onUse: (e: any) => void;
}

export default function Reward({ id, cafeName, isValid, onUse }: Props) {
  const colourScheme = isValid
    ? "border-moss_green-400 bg-moss_green-600"
    : "border-neutral-200 bg-neutral-400";

  const textColour = isValid ? "text-snow" : "text-neutral-500";

  return (
    <div className={"flex w-full rounded-md border p-4 " + colourScheme}>
      <Heading
        variant="primary"
        className={"m-auto text-xl font-semibold " + textColour}
        position="left"
        title={cafeName}
      />
      <Button
        id={id}
        variant={isValid === true ? "primary" : "secondary"}
        disabled={!isValid}
        label={isValid ? "REDEEM" : "USED"}
        onDoubleClick={onUse}
      />
    </div>
  );
}
