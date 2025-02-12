import { http, HttpResponse } from "msw";

const apiServerUrl = process.env.VITE_API_SERVER_URL;

interface Overrides {
  "/users/rewards"?: any;
  "/rewards/use"?: any;
  "/users/scan"?: any;
  "/cafes/customers"?: any;
}

export const createHandlers = (overrides: Overrides = {}) => [
  http.get(`${apiServerUrl}/users/rewards`, () => {
    return HttpResponse.json(
      overrides["/users/rewards"] || [
        {
          id: 3,
          cafeId: "auth0|123456",
          cafeName: "Demo Cafe 2",
          isValid: true,
        },
        {
          id: 3,
          cafeId: "auth0|123456",
          cafeName: "Demo Cafe 2",
          isValid: false,
        },
      ],
    );
  }),

  http.post(`${apiServerUrl}/rewards/use`, () => {
    return HttpResponse.json(
      overrides["/rewards/use"] || {
        id: 3,
        userId: "auth0|654321",
        cafeId: "auth0|123456",
        tokenCount: 0,
        validRewards: 1,
        usedRewards: 8,
        visitCount: 62,
        createdAt: "2025-01-16T00:29:07.754Z",
        updatedAt: "2025-01-30T04:43:56.460Z",
      },
    );
  }),

  http.get(`${apiServerUrl}/users/scan`, () => {
    return HttpResponse.json(
      overrides["/users/scan"] || {
        id: 3,
        userId: "auth0|678850fd75cf70d62c0dca42",
        tokenCount: 0,
        validRewards: 1,
        usedRewards: 8,
        visitCount: 62,
        cafeName: "Demo Cafe 2",
        rewardFreq: 6,
      },
    );
  }),

  http.get(`${apiServerUrl}/cafes/customers`, () => {
    return HttpResponse.json(
      overrides["/cafes/customers"] || [
        {
          phoneNumber: "+61423327232",
          dob: "2000-11-04",
          suburb: "Bellambi",
          validRewards: 1,
          visitCount: 62,
          tokenCount: 0,
        },
        {
          phoneNumber: "+61422222222",
          dob: "2000-11-01",
          suburb: "Corrimal",
          validRewards: 3,
          visitCount: 63,
          tokenCount: 0,
        },
      ],
    );
  }),
];
