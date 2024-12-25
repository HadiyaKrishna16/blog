import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar';

const CreateBlog = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addBlog } = useBlog();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '',
    imageUrl: '',
    content: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newBlog = {
      ...formData,
      id: Date.now(),
      author: {
        name: user.name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
      },
      date: new Date().toLocaleDateString(),
      readTime: `${Math.ceil(formData.content.length / 1000)} min read`,
      likes: 0,
      isLiked: false
    };

    addBlog(newBlog);
    navigate(`/blog/${newBlog.id}`);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Blog Post</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., React, JavaScript, Web Development"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                required
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter image URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Excerpt
              </label>
              <textarea
                name="excerpt"
                required
                value={formData.excerpt}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write a short description of your blog"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                name="content"
                required
                value={formData.content}
                onChange={handleChange}
                rows="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your blog content here..."
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog; 