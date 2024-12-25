import { useBlog } from '../context/BlogContext';
import Navbar from '../components/Navbar';
import BlogCard from '../components/Blog/BlogCard';

const Home = () => {
  const { blogs, loading } = useBlog();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="pt-20 flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Blog</h1>
            <p className="text-xl mb-8">Explore the latest in web development, programming, and tech.</p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <main className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-xl font-bold text-white">DevBlog</h4>
              <p className="text-sm">Sharing knowledge and experiences</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">GitHub</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
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
