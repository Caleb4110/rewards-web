import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import TokenBar from "../components/TokenBar";
import { checkAuthenticityAndGetRewardData } from "../services/message.service";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";

//  ETRNL err code options:
//    ctrBehind - The URL has expired and is no longer valid.
//    uidMismatch - The encrypted UID did not match the UID stored in our database for the tag ID. The encrypted data was probably tampered with.
//    cmacMismatch - CMAC signature check did not succeed. The CMAC was probably tampered with.
//    doesNotExist - The tag ID is invalid and does not exist in our database.
//    inactive - The tag has been marked as inactive in our database. This is probably a result of a tag that hasn’t been completely programmed.
//    unauthorized - The tag does not belong to your organization.
//

// TODO: Add cafe info functionality
export default function TokenPage() {
  const [nfcError, setNfcError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<any | null>(null);
  const [rewardData, setRewardData] = useState<any | null>(null);
  const { getAccessTokenSilently, loginWithPopup, isLoading, user } =
    useAuth0();

  // NOTE: TEMPORARY FOR TESTING
  const cafeId = "auth0|67885176fbd7752104ce68c7";

  const navigate = useNavigate();

  // TODO: Check if redirect or login with popup is better OR if the authenticationGuard does this for us
  // Get access token for requesting server data on page load
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (error: any) {
        if (
          error.error === "login_required" ||
          error.error === "consent_required"
        ) {
          loginWithPopup();
        }
        throw error;
      }
    };
    if (!isLoading) {
      getToken();
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    // TODO: Fetch cafe id on login
    const getTokens = async () => {
      // 1. Check tag authenticity
      const url = new URL(window.location.href);

      const tagId = url.searchParams.get("tagId");
      const eCode = url.searchParams.get("eCode");
      const enc = url.searchParams.get("enc");
      const cmac = url.searchParams.get("cmac");

      const { data, error } = await checkAuthenticityAndGetRewardData(
        accessToken,
        user?.sub,
        cafeId,
        tagId,
        eCode,
        enc,
        cmac,
      );

      if (data) {
        setNfcError(null);
        setRewardData(data);
      } else if (error) {
        setNfcError(error.message.toUpperCase());
        setRewardData(null);
      }
    };

    getTokens();
  }, [accessToken]);

  const rewardsButtonHandler = () => {
    navigate(`/user/dashboard?cafeId=${cafeId}`);
  };

  if (isLoading) {
    return <PageLoader />;
  } else if (nfcError) {
    return (
      <div className="flex flex-col space-y-2 justify-center h-screen w-screen bg-snow p-5 text-moss_green antialiased">
        <Heading
          title={nfcError}
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
  } else if (rewardData) {
    return (
      <div className="flex flex-col  h-screen w-screen bg-snow p-5 text-moss_green antialiased">
        <div className="flex flex-col h-1/3 space-y-2 justify-start">
          <Heading
            variant="secondary"
            title="WELCOME BACK TO..."
            position="left"
            className="text-lg"
          />

          <Heading
            variant="primary"
            title={rewardData.cafeName}
            position="left"
            className=""
          />

          <Heading
            variant="primary"
            title={`You have visited ${rewardData.visitCount} times`}
            position="left"
            className="text-lg"
          />
        </div>
        <div className="flex flex-col h-1/3 space-y-2 justify-center">
          <Heading
            variant="primary"
            title={`BUY ${rewardData.rewardFreq} GET 1 FREE`}
            position="center"
            className="text-lg"
          />

          <TokenBar
            total={rewardData.rewardFreq}
            rewardCount={rewardData.tokenCount}
          />
        </div>
        {rewardData.validRewards && (
          <div className="flex flex-col h-1/3 space-y-2 justify-end">
            <Heading
              variant="primary"
              title={`NOTE: YOU HAVE ${rewardData.validRewards} FREE COFFEES AVAILABLE`}
              position="center"
              className="text-lg animate-bounce"
            />
            <Button
              label="CLICK HERE TO VIEW"
              variant="primary"
              onClick={rewardsButtonHandler}
            />
          </div>
        )}
      </div>
    );
  }
}
