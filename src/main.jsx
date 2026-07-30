import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/react";
import App from "./App.jsx";
import "./index.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        variables: {
          colorPrimary: "#A855F7",
          // colorBackground: "#581C87",
          colorBackground: "#52307c",
          colorText: "#FFFFFF",
          colorTextSecondary: "#DDD6FE",
          colorInputBackground: "#6B21A8",
          colorInputText: "#FFFFFF",
          colorNeutral: "#C4B5FD",
          borderRadius: "0.75rem",
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
);
