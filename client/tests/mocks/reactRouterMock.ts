import { vi } from "vitest";
import * as reactRouter from "react-router-dom";

interface ReactRouterMock {
  useNavigate: () => () => Promise<void>;
}

const defaultReactRouterMock: ReactRouterMock = {
  useNavigate: vi.fn(() => vi.fn()),
};

export const mockReactRouter = (overrides: Partial<ReactRouterMock> = {}) => {
  vi.spyOn(reactRouter, "useNavigate").mockImplementation(() =>
    (overrides.useNavigate || defaultReactRouterMock.useNavigate)(),
  );
};
