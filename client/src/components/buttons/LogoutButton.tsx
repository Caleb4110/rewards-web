import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  returnTo: string;
}

export default function LogoutButton({ returnTo }: Props) {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: returnTo,
      },
    });
  };

  return (
    <button className="button__logout" onClick={handleLogout}>
      Log Out
    </button>
  );
}
