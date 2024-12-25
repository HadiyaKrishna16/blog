import { useParams } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const { blogs, likeBlog, shareBlog } = useBlog();
  const { user } = useAuth();
  
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl text-gray-600">Blog post not found</h2>
          <Link to="/" className="text-blue-600">Go back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <article className="max-w-4xl mx-auto px-4 py-8">
          <img 
            src={blog.imageUrl} 
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-8"
          />
          
          <div className="flex items-center space-x-4 mb-6">
            <img 
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-medium text-gray-800">{blog.author.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <span>{blog.category}</span>
                <span className="mx-2">•</span>
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <p className="text-lg text-gray-700 mb-8">{blog.excerpt}</p>
          
          <div className="flex items-center space-x-4 border-t pt-6">
            <button 
              onClick={() => user ? likeBlog(blog.id) : alert('Please login to like')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                blog.isLiked 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span>{blog.likes} likes</span>
            </button>
            
            <button 
              onClick={() => shareBlog(blog.id)}
              className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail; 