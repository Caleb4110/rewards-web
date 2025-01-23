import LoginLayout from "../components/LoginLayout";

export default function LoginCafe() {
  return (
    <div className="p-5 bg-snow">
      <LoginLayout
        returnTo="/cafe/dashboard"
        role="cafe"
        pageHeading="LOGIN TO CAFE DASHBOARD"
      />
    </div>
  );
}
