import Button from "./buttons/Button";
import Heading from "./Heading";

interface Props {
  id: string;
  cafeName: string;
  isValid: boolean;
  onUse: (e: any) => void;
}

// TODO: Add inactive button variant for used rewards
export default function Reward({ id, cafeName, isValid, onUse }: Props) {
  const colourScheme = isValid
    ? "border-moss_green-400 bg-moss_green-600"
    : "border-neutral-200 bg-neutral-400";

  const textColour = isValid ? "text-snow" : "text-neutral-500";

  return (
    <div className={"flex w-full rounded-md border p-4 " + colourScheme}>
      <Heading
        variant="primary"
        className={"m-auto " + textColour}
        position="left"
        title={cafeName}
      />
      <Button
        id={id}
        variant={isValid === true ? "primary" : "disabled"}
        disabled={!isValid}
        label={isValid ? "USE REWARD" : "USED"}
        onClick={onUse}
      />
    </div>
  );
}
