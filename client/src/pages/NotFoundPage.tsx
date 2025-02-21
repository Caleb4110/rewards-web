import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import BugForm from "../components/BugForm";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const userButtonHandler = () => {
    navigate("/auth/dashboard");
  };

  const cafeButtonHandler = () => {
    navigate("/auth/cafe");
  };

  return (
    <div className="flex flex-col h-fit w-screen p-5 space-y-2 justify-center">
      <Popup
        isOpen={isOpen}
        closePopup={() => setIsOpen(false)}
        element={<BugForm />}
      />
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
      <div className="flex justify-end">
        <Button
          variant="minimal"
          onClick={() => setIsOpen(true)}
          label="REPORT A BUG"
          className="w-1/2"
        />
      </div>
    </div>
  );
}
