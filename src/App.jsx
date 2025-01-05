import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthRoutes from "./components/AuthRoutes"; 
import CreateBlog from './components/CreateBlog';
import BlogDetail from './components/Blog/BlogDetail';
import UserProfile from './components/User/UserProfile';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
          },
          success: {
            iconTheme: {
              primary: '#4CAF50',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f44336',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<AuthRoutes />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/user/:userId" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
