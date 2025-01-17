import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import AuthenticationGuard from "./components/AuthenticationGuard";
import LoginUserDashboard from "./pages/LoginUserDashboard";
import LoginCafe from "./pages/LoginCafe";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/PageLoader";
import CafeDashboard from "./pages/CafeDashboard";
import UserDashboard from "./pages/UserDashboard";
import Heading from "./components/Heading";
import Button from "./components/buttons/Button";
import LogoutButton from "./components/buttons/LogoutButton";

function App() {
  const { isLoading, user } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth/dashboard" element={<LoginUserDashboard />} />
      <Route path="/auth/reward" element={<div>NEED TO ADD REWARDS</div>} />
      <Route path="/auth/cafe" element={<LoginCafe />} />
      <Route
        path="/cafe/dashboard"
        element={
          <AuthenticationGuard
            component={CafeDashboard}
            redirectTo={"/auth/dashboard"}
            role={"cafe"}
          />
        }
      />
      <Route
        path="/user/dashboard"
        element={
          <AuthenticationGuard
            component={UserDashboard}
            redirectTo={"/auth/cafe"}
            role={"user"}
          />
        }
      />

      {/* NOT FOUND ROUTE */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
