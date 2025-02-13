import Button from "../Button";
import Heading from "../Heading";

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: Props) {
  return (
    <div
      role="alert"
      className="p-5 flex h-screen w-screen flex-col items-center justify-between"
    >
      <Heading
        variant="primary"
        position="center"
        title="THE FOLLOWING ERROR HAS OCCURRED"
        className="text-2xl"
      />
      <p className="text-3xl text-red-500">{error.message}</p>
      <Button
        onClick={resetErrorBoundary}
        variant="primary"
        label="TRY AGAIN"
      />
    </div>
  );
}
