import { useAuth0 } from "@auth0/auth0-react";
import Heading from "./Heading";
import Button from "./Button";
import { useState } from "react";
import Popup from "./Popup";
import BugForm from "./BugForm";

interface Props {
  role: "user" | "cafe";
  returnTo: string;
  pageHeading: string;
}

export default function LoginLayout({ role, returnTo, pageHeading }: Props) {
  const { loginWithRedirect } = useAuth0();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo,
        role,
      },
      authorizationParams: {
        role,
      },
    });
  };

  return (
    <div className="flex flex-col box-border h-full space-y-2 justify-between">
      <Popup
        isOpen={isOpen}
        closePopup={() => setIsOpen(false)}
        element={<BugForm />}
      />
      <Heading
        variant="primary"
        position="center"
        title={pageHeading}
        className="text-2xl"
      />
      <div className="flex flex-col space-y-2">
        <Button variant="primary" onClick={handleLogin} label="LOGIN" />
        <Heading
          variant="secondary"
          position="center"
          title="You will be redirected to the login form once pressed"
        />
      </div>
      <Button
        variant="minimal"
        onClick={() => setIsOpen(true)}
        label="REPORT A BUG"
      />
    </div>
  );
}
