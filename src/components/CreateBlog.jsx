import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import { useBlog } from "../context/BlogContext";
import Navbar from "./Navbar";


const supabaseUrl = "https://eyfrxdqlkopnugatqvgd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5ZnJ4ZHFsa29wbnVnYXRxdmdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0Nzk0NjcsImV4cCI6MjA1MTA1NTQ2N30.H-ghaOXbQDFn7HspV8Mv0Zq1PHkMIE0fGXcPd7QaQx4"; // Replace with your actual Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

const CreateBlog = () => {
  const { user } = useUser();
  const { addBlog } = useBlog();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    imageUrl: "",
    content: "",
    excerpt: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Redirect if the user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      imageUrl: "",
      content: "",
      excerpt: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { title, category, imageUrl, content, excerpt } = formData;

      if (!title || !category || !imageUrl || !content || !excerpt) {
        throw new Error("All fields are required.");
      }

      const newBlog = {
        id: Date.now(), // temporary ID for demo
        title,
        category,
        imageUrl,
        content,
        excerpt,
        author: {
          name: user.fullName || user.username,
          avatar: user.imageUrl
        },
        likes: 0,
        isLiked: false,
        readTime: `${Math.ceil(content.split(' ').length / 200)} min read`
      };

      // Add to Supabase
      const { error: supabaseError } = await supabase
        .from("blogs")
        .insert([{
          title,
          category,
          img: imageUrl,
          content,
          excerpt,
          created_at: new Date(),
        }]);

      if (supabaseError) throw new Error(supabaseError.message);

      // Add to BlogContext
      addBlog(newBlog);
      resetForm();
      navigate('/'); // Redirect to home page

    } catch (err) {
      setError(err.message || "Unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 flex flex-col">
      <Navbar />
      <div className="container mx-auto p-8 mt-3">
        <center><h1 className="text-2xl font-bold mb-4">Create a New Blog Post</h1></center>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <LoadingSpinner />}
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your blog title..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Technology, Programming, Design..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter the URL of your blog cover image..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Write a brief summary of your blog post..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              rows="3"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              rows="6"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
