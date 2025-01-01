import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { BlogProvider } from './context/BlogContext';
import { AuthProvider } from './context/AuthContext';
import App from "./App.jsx";
import "./index.css";
import "./styles/custom.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key. Set VITE_CLERK_PUBLISHABLE_KEY in your .env file.");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthProvider>
        <BlogProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BlogProvider>
      </AuthProvider>
    </ClerkProvider>
  </React.StrictMode>
);
