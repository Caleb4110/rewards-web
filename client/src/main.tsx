import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithNav from "./providers/AuthProviderWithNav.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Auth0ProviderWithNav>
      <App />
    </Auth0ProviderWithNav>
  </BrowserRouter>,
);
