import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { BlogProvider } from './context/BlogContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import App from "./App.jsx";
import "./index.css";
import "./styles/custom.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthProvider>
        <BlogProvider>
          <BrowserRouter>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  theme: {
                    primary: '#4CAF50',
                  },
                },
                error: {
                  duration: 4000,
                  theme: {
                    primary: '#E57373',
                  },
                },
              }}
            />
            <App />
          </BrowserRouter>
        </BlogProvider>
      </AuthProvider>
    </ClerkProvider>
  </React.StrictMode>
);
