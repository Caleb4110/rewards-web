import LoginButton from "../components/buttons/LoginButton";
import LogoutButton from "../components/buttons/LogoutButton";
// TODO: Make login page look pretty and redirect to rewards page
export default function LoginUserReward() {
  return (
    <>
      <LoginButton returnTo={"/user/dashboard"} role={"user"} />
    </>
  );
}
