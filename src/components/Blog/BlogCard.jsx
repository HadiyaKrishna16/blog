import { Link } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';

const BlogCard = ({ blog }) => {
  const { likeBlog, shareBlog } = useBlog();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <img 
        src={blog.imageUrl} 
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={blog.author.avatar} 
            alt={blog.author.name}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p className="font-semibold text-gray-800">{blog.author.name}</p>
            <p className="text-sm text-gray-600">{blog.readTime}</p>
          </div>
        </div>
        
        <Link to={`/blog/${blog.id}`}>
          <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition">{blog.title}</h2>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
        
        <div className="flex items-center justify-between">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
            {blog.category}
          </span>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => likeBlog(blog.id)}
              className={`flex items-center space-x-1 ${blog.isLiked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={blog.isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{blog.likes}</span>
            </button>
            
            <button 
              onClick={() => shareBlog(blog.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard; 