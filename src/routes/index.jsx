import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const clerkFrontendApi = 'YOUR_CLERK_FRONTEND_API'; // Replace with your Clerk Frontend API

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider frontendApi={clerkFrontendApi}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);  
