import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Challenges from "./pages/ChallengesPage";
import AuthenticationGuard from "./components/AuthenticationGuard";
import LoginUser from "./pages/LoginUser";
import LoginCafe from "./pages/LoginCafe";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/PageLoader";
import CafeDashboard from "./pages/CafeDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth/user" element={<LoginUser />} />
      <Route path="/auth/cafe" element={<LoginCafe />} />
      <Route
        path="/cafe/dashboard"
        element={<AuthenticationGuard component={CafeDashboard} />}
      />
      <Route
        path="/user/dashboard"
        element={<AuthenticationGuard component={UserDashboard} />}
      />

      {/* NOT FOUND ROUTE */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
