import React from "react";
import { Routes, Route } from "react-router-dom";
import { RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./pages/Home";
import AuthRoutes from "./components/AuthRoutes"; 
import CreateBlog from './components/CreateBlog';
import BlogDetail from './components/Blog/BlogDetail';
import UserProfile from './components/User/UserProfile';

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/protected" element={<RedirectToSignIn />} />
      <Route path="/*" element={<AuthRoutes />} />
      <Route path="/create-blog" element={<CreateBlog />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/user/:userId" element={<UserProfile />} />

    </Routes>



  );
}

export default App;
