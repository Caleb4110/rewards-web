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
    <div className="flex flex-col h-screen space-y-2 justify-start">
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
      <Heading
        variant="secondary"
        position="center"
        title="You will be redirected to the login form once pressed"
      />
      <Button variant="primary" onClick={handleLogin} label="LOGIN" />
      {/*<CoffeeCup />*/}

      <div className="flex flex-col h-full justify-end">
        <Button
          variant="minimal"
          onClick={() => setIsOpen(true)}
          label="REPORT A BUG"
          className="w-1/2 "
        />
      </div>
    </div>
  );
}
