import Button from "./buttons/Button";
import Heading from "./Heading";

export default function Reward() {
  return (
    <div className="flex w-full rounded-md border border-moss_green-400 bg-moss_green-600 p-4">
      <Heading
        variant="primary"
        className="m-auto text-snow"
        position="left"
        title="AVAILABLE"
      />
      <Button variant="primary" label="USE REWARD" />
    </div>
  );
}
