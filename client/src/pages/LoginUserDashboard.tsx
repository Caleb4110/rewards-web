import Button from "../components/buttons/Button";
import LoginButton from "../components/buttons/LoginButton";
import Heading from "../components/Heading";
import { useAuth0 } from "@auth0/auth0-react";

// TODO: Make login page look pretty and redirect to rewards page
export default function LoginUserDashboard() {
  const role = "user";
  const returnTo = "/user/dashboard";

  const { loginWithRedirect } = useAuth0();

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
    <div className="flex flex-col h-screen justify-center">
      <Heading
        variant="primary"
        position="center"
        title="USER DASHBOARD LOGIN"
        className="text-2xl p-4"
      />
      <Button
        variant="primary"
        onClick={handleLogin}
        label="LOGIN"
        className="w-2/6 m-auto"
      />
    </div>
  );
}
