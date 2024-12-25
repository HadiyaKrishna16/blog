import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginForm from '../components/Auth/LoginForm';
import SignUp from '../components/Auth/SignUp';
import BlogDetail from '../components/Blog/BlogDetail';
import CreateBlog from '../components/Blog/CreateBlog';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 