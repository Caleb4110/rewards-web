import Button from "../components/Button";
import Heading from "../components/Heading";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const userButtonHandler = () => {
    navigate("/auth/dashboard");
  };

  const cafeButtonHandler = () => {
    navigate("/auth/cafe");
  };

  return (
    <div className="flex flex-col h-fit w-screen p-5 space-y-2 justify-center">
      <Heading
        variant="primary"
        position="center"
        title="404"
        className="text-4xl font-semibold"
      />
      <Heading
        variant="secondary"
        position="center"
        title="OOPS! PAGE NOT FOUND"
      />
      <div className="flex space-x-4">
        <Button
          label="USER LOGIN"
          variant="primary"
          onClick={userButtonHandler}
        />
        <Button
          label="CAFE LOGIN"
          variant="primary"
          onClick={cafeButtonHandler}
        />
      </div>
    </div>
  );
}
