import React from "react";
import { Routes, Route } from "react-router-dom";
import { RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./pages/Home";
import AuthRoutes from "./components/AuthRoutes";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import CreateBlog from './components/CreateBlog';

const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/protected" element={<RedirectToSignIn />} />
      <Route path="/*" element={<AuthRoutes />} />
      <Route path="/create-blog" element={<CreateBlog />} />
     
    </Routes>
    


  );
}

export default App;
