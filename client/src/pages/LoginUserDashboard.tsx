import LoginLayout from "../components/LoginLayout";

export default function LoginUserDashboard() {
  return (
    <div className="p-5">
      <LoginLayout
        returnTo="/user/dashboard"
        role="user"
        pageHeading="LOGIN TO USER DASHBOARD"
      />
    </div>
  );
}
