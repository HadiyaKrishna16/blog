import React from 'react';
import { useAuth } from '../context/AuthContext';
import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import Navbar from '../components/Navbar';
import BlogCard from '../components/Blog/BlogCard';
import { useBlog } from '../context/BlogContext';

const Home = () => {
  const { blogs, loading } = useBlog();
  const { user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} />
      <div className="pt-10 flex-grow">
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Blog</h1>
            <center>
              
          
            <SignedIn>
              <p className="text-2xl font-semibold">
                Hello, {user ? user.firstName || user.username || user.email : 'Guest'}!
              </p>
              {/* <SignOutButton>
                <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300">Logout</button>
              </SignOutButton> */}
            </SignedIn>
            <SignedOut>
              <p className="text-xl mb-8">Please log in to access more features.</p>
            </SignedOut>
            <p className="text-xl mb-8">Explore the latest in web development, programming, and tech.</p>
            </center>
          </div>
        </section>

        <main className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </main>
      </div>

      <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-xl font-bold text-white">DevBlog</h4>
              <p className="text-sm">Sharing knowledge and experiences</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://x.com/" className="hover:text-white transition">Twitter</a>
              <a href="https://github.com/" className="hover:text-white transition">GitHub</a>
              <a href="https://www.linkedin.com/" className="hover:text-white transition">LinkedIn</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} DevBlog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
