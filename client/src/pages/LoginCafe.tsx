import LoginButton from "../components/buttons/LoginButton";
import LogoutButton from "../components/buttons/LogoutButton";
// TODO: Make login page look pretty and redirect to rewards page
export default function LoginCafe() {
  console.log("here");
  return (
    <>
      <LoginButton returnTo={"/cafe/dashboard"} role={"cafe"} />
      <LogoutButton />
    </>
  );
}
