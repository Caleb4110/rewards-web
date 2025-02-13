import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithNav from "./providers/AuthProviderWithNav.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/errors/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <BrowserRouter>
      <Auth0ProviderWithNav>
        <App />
      </Auth0ProviderWithNav>
    </BrowserRouter>
  </ErrorBoundary>,
);
