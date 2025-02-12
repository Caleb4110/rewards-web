import { vi } from "vitest";
import * as auth0 from "@auth0/auth0-react";

interface Auth0Mock {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    sub: string;
  };
  loginWithRedirect: () => Promise<void>;
  loginWithPopup: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessTokenSilently: () => Promise<string>;
  getAccessTokenWithPopup: () => Promise<string>;
  getIdTokenClaims: () => Promise<any>;
  isLoading: boolean;
}

// Default mock values for Auth0
const defaultAuth0Mock: Auth0Mock = {
  isAuthenticated: true,
  user: {
    name: "Test User",
    email: "test@example.com",
    sub: "auth0|654321",
  },
  loginWithRedirect: vi.fn(),
  loginWithPopup: vi.fn(),
  logout: vi.fn(),
  getAccessTokenSilently: vi.fn(() => Promise.resolve("mock-access-token")),
  getAccessTokenWithPopup: vi.fn(() => Promise.resolve("mock-access-token")),
  getIdTokenClaims: vi.fn(() =>
    Promise.resolve({ "https://rewards.com/roles": ["user"] }),
  ),
  isLoading: false,
};

// Function to mock Auth0 in tests
export const mockAuth0 = (overrides: Partial<Auth0Mock> = {}) => {
  (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
    ...defaultAuth0Mock,
    ...overrides,
    user: {
      ...defaultAuth0Mock.user,
      ...(overrides.user || {}),
    },
  });
};
