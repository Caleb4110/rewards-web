import { Route, Routes } from "react-router-dom";
import AuthenticationGuard from "./components/AuthenticationGuard";
import LoginUserDashboard from "./pages/LoginUserDashboard";
import LoginCafe from "./pages/LoginCafe";
import NotFoundPage from "./pages/NotFoundPage";
import CafeDashboard from "./pages/CafeDashboard";
import UserDashboard from "./pages/UserDashboard";
import LoginUserReward from "./pages/LoginUserReward";
import TokenPage from "./pages/TokenPage";
import ErrorFallback from "./components/errors/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorInfo } from "react";

function App() {
  const logError = (error: Error, info: ErrorInfo) => {
    console.error("An error occurred:", info);
  };

  return (
    <Routes>
      <Route path="/auth/dashboard" element={<LoginUserDashboard />} />
      <Route path="/auth/reward" element={<LoginUserReward />} />
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
      <Route
        path="/user/token"
        element={
          <AuthenticationGuard
            component={TokenPage}
            redirectTo={"/auth/cafe"}
            role={"user"}
          />
        }
      />
      <Route path="/callback" element={null} />
      {/* NOT FOUND ROUTE */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
