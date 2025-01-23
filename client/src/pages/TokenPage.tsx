import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import TokenBar from "../components/TokenBar";
import AccessDenied from "../components/AccessDenied";
import { checkAuthenticityAndGetTokens } from "../services/message.service";
import Heading from "../components/Heading";

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
  const [nfcStatus, setNfcStatus] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<any | null>(null);
  const [rewardData, setRewardData] = useState<any | null>(null);
  const { getAccessTokenSilently, loginWithPopup, isLoading, user } =
    useAuth0();

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
    while (isLoading);
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
      const cafeId = "auth0|67885176fbd7752104ce68c7";

      const { data, error } = await checkAuthenticityAndGetTokens(
        accessToken,
        user?.sub,
        cafeId,
        tagId,
        eCode,
        enc,
        cmac,
      );

      if (data) {
        setNfcStatus(null);
        setRewardData(data);
        console.log(data);
      }

      // TODO: HANDLE ERRRORS
      else if (error) {
        console.log(error);
      }
    };

    getTokens();
  }, [accessToken]);

  // TODO: Is there a more efficient way to do conditional rendering?
  switch (nfcStatus) {
    case "loading":
      return <div>LOADING</div>;
    case "unauthorized":
      return <AccessDenied label="Unauthorised access" />;
    case "ctrBehind":
      return <AccessDenied label="Old scan" />;
    case "invalidData":
      return <AccessDenied label="Invalid data" />;
    case null:
      return (
        rewardData && (
          <div className="flex flex-col space-y-9 h-screen w-screen bg-snow p-5 text-moss_green antialiased">
            <div className="flex flex-col space-y-2">
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
            <div className="flex flex-col space-y-2">
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
              <Heading
                variant="primary"
                title={`NOTE: YOU HAVE ${rewardData.validRewards} FREE COFFEES AVAILABLE`}
                position="center"
                className="text-lg"
              />
            )}
          </div>
        )
      );
  }
}
