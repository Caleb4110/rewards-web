import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { ComponentType, useEffect } from "react";
import PageLoader from "./PageLoader";
import { useNavigate } from "react-router-dom";

interface Props {
  component: ComponentType;
  redirectTo: string; // address to return to if role doesn't match required role
  role: string; // user or cafe
}

export default function AuthenticationGuard({
  component,
  redirectTo,
  role,
}: Props) {
  const { getIdTokenClaims, isLoading, } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const getClaims = async () => {
      const claims = await getIdTokenClaims();
      console.log(claims)
      if (
        !claims?.["https://app.rewards.com/role"]?.includes(role) &&
        !isLoading
      ) {
        navigate(redirectTo);
      }
    };

    getClaims();
  }, []);

  const Component = withAuthenticationRequired(component as ComponentType, {
    onRedirecting: () => <PageLoader />,
  });

  return <Component />;
}
