import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import Navbar from '../Navbar';

const BlogDetail = () => {
  const { id } = useParams();
  const { blogs, likeBlog, shareBlog } = useBlog();
  const navigate = useNavigate();

  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-xl">Blog not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>

        <img 
          src={blog.imageUrl} 
          alt={blog.title}
          className="w-full h-48 sm:h-64 lg:h-96 object-cover rounded-lg shadow-lg mb-6 sm:mb-8"
        />

        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          <div className="flex items-center mb-4 sm:mb-6">
            <img 
              src={blog.author.avatar} 
              alt={blog.author.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
            />
            <div>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">{blog.author.name}</p>
              <p className="text-xs sm:text-sm text-gray-600">{blog.readTime}</p>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">{blog.title}</h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded inline-block">
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
                <span className="text-sm sm:text-base">{blog.likes}</span>
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

          <div className="prose max-w-none">
            <p className="text-gray-600 text-sm sm:text-base mb-4">{blog.excerpt}</p>
            <div className="mt-6 text-gray-800 text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
              {blog.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 
