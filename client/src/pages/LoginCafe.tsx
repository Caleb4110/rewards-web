import LoginLayout from "../components/LoginLayout";

export default function LoginCafe() {
  return (
    <div className="p-5">
      <LoginLayout
        returnTo="/cafe/dashboard"
        role="cafe"
        pageHeading="LOGIN TO CAFE DASHBOARD"
      />
    </div>
  );
}
