import { vi } from "vitest";
import * as errorBoundary from "react-error-boundary";

interface reactErrorBoundaryMock {
  showBoundary: () => Promise<void>;
}

// Default mock values for Auth0
const defaultErrorBoundaryMock: reactErrorBoundaryMock = {
  showBoundary: vi.fn(),
};

// Function to mock Auth0 in tests
export const mockErrorBoundary = (
  overrides: Partial<reactErrorBoundaryMock> = {},
) => {
  (errorBoundary as any).useErrorBoundary = vi.fn().mockReturnValue({
    ...defaultErrorBoundaryMock,
    ...overrides,
  });
};
