import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import TokenBar from "../components/TokenBar";
import { checkAuthenticityAndGetRewardData } from "../services/api.service";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { useErrorBoundary } from "react-error-boundary";
import Popup from "../components/Popup";
import BugForm from "../components/BugForm";

// TODO: Add cafe info functionality
export default function TokenPage() {
  const [nfcError, setNfcError] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<any | null>(null);
  const { getAccessTokenSilently, isAuthenticated, isLoading, user } =
    useAuth0();
  const { showBoundary } = useErrorBoundary();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // NOTE: TEMPORARY FOR TESTING
  const cafeId = "auth0|67885176fbd7752104ce68c7";

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.sub) return;

    const getTokens = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        localStorage.setItem("accessToken", accessToken);

        const url = new URL(window.location.href);

        const tagId = url.searchParams.get("tagId");
        const eCode = url.searchParams.get("eCode");
        const enc = url.searchParams.get("enc");
        const cmac = url.searchParams.get("cmac");

        const { data } = await checkAuthenticityAndGetRewardData(
          user?.sub!,
          cafeId,
          tagId,
          eCode,
          enc,
          cmac,
        );

        setTokenData(data);
      } catch (error: any) {
        if (error.response?.data) {
          // Extract any tag scan errors
          setNfcError(error.response.data.message);
        } else {
          // Otherwise, render the error page
          showBoundary(error);
        }
      }
    };

    getTokens();
  }, [user?.sub]);

  const rewardsButtonHandler = () => {
    navigate(`/user/dashboard?cafeId=${cafeId}`);
  };

  if (isLoading) {
    return <PageLoader />;
  } else if (nfcError) {
    return (
      <div className="flex flex-col space-y-2 justify-center h-screen w-screen p-5 text-moss_green antialiased">
        <Heading
          title={nfcError.toUpperCase()}
          position="center"
          className="text-4xl font-semibold"
          variant="primary"
        />
        <Heading
          title="PLEASE SCAN AGAIN"
          position="center"
          variant="secondary"
        />
      </div>
    );
  } else if (isAuthenticated && tokenData) {
    return (
      <div className="flex flex-col  h-screen w-screen p-5 text-moss_green antialiased">
        <Popup
          isOpen={isOpen}
          closePopup={() => setIsOpen(false)}
          element={<BugForm />}
        />
        <div className="flex flex-col h-1/3 space-y-2 justify-start">
          <Heading
            variant="secondary"
            title="WELCOME BACK TO..."
            position="left"
            className="text-lg"
          />

          <Heading
            variant="primary"
            title={tokenData.cafeName}
            position="left"
            className=""
          />

          <Heading
            variant="primary"
            title={`You have visited ${tokenData.visitCount} times`}
            position="left"
            className="text-lg"
          />
        </div>
        <div className="flex flex-col h-1/3 space-y-2 justify-center">
          <Heading
            variant="primary"
            title={`BUY ${tokenData.rewardFreq} GET 1 FREE`}
            position="center"
            className="text-lg"
          />

          <TokenBar
            total={tokenData.rewardFreq}
            rewardCount={tokenData.tokenCount}
          />
        </div>
        <div className="flex flex-col h-1/3 space-y-2 justify-end">
          {tokenData.validRewards ? (
            <>
              <Heading
                variant="primary"
                title={`NOTE: YOU HAVE ${tokenData.validRewards} FREE COFFEES AVAILABLE`}
                position="center"
                className="text-lg animate-bounce"
              />
              <Button
                label="CLICK HERE TO VIEW"
                variant="primary"
                onClick={rewardsButtonHandler}
              />
            </>
          ) : null}
          <Button
            variant="minimal"
            onClick={() => setIsOpen(true)}
            label="REPORT A BUG"
            className="w-1/2 text-lg"
          />
        </div>
      </div>
    );
  }
}
