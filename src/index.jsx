import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const clerkFrontendApi = process.env.REACT_APP_CLERK_FRONTEND_API; // Ensure this is set in your .env file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider frontendApi={clerkFrontendApi}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
); 