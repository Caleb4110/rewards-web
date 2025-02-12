import LoginLayout from "../components/LoginLayout";

export default function LoginUserReward() {
  return (
    <div className="p-5 bg-snow">
      <LoginLayout
        returnTo="/user/token"
        role="user"
        pageHeading="LOGIN TO RECIEVE REWARD"
      />
    </div>
  );
}
