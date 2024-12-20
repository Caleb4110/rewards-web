import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ComponentType } from "react";
import PageLoader from "./PageLoader";

interface Props {
  component: ComponentType;
}

export default function AuthenticationGuard({ component }: Props) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageLoader />,
  });

  return <Component />;
}
