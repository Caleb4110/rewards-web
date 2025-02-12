import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Heading from "./Heading";

export default function PageLoader() {
  return (
    <div className="flex flex-col w-screen h-screen bg-snow justify-center content-center">
      <DotLottieReact
        src="https://lottie.host/1159363a-08aa-4d1d-b87e-185e0fa2a01f/dQRz0DHaK1.lottie"
        loop
        autoplay
      />
      <Heading variant="primary" position="center" title="LOADING" />
    </div>
  );
}
