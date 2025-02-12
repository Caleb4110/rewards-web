var axios = require("axios").default;

export default async function getManagementToken() {
  var options = {
    method: "POST",
    url: "https://dev-le7c37xt15b74t5d.au.auth0.com/oauth/token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "kyHoDTXAoQgnauofSCvDyZ6wfumu47F8",
      client_secret: process.env.AUTH0_HOOK_SECRET,
      audience: "https://dev-le7c37xt15b74t5d.au.auth0.com/api/v2/",
    }),
  };

  const response = await axios.request(options);

  return response.data.access_token;
}
