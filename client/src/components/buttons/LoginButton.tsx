import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  returnTo: string;
  role: "user" | "cafe";
}

export default function LoginButton({ returnTo, role }: Props) {
  const { loginWithRedirect } = useAuth0();
  console.log(role);

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

  return <button onClick={handleLogin}>Log In</button>;
}
