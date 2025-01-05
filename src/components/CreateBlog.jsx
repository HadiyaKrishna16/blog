import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import { useBlog } from "../context/BlogContext";
import Navbar from "./Navbar";
import { FaImage, FaHeading, FaTags, FaFileAlt, FaQuoteLeft, FaTimes, FaMagic, FaUpload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


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
    content: "",
    excerpt: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError("Please upload an image file");
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      throw new Error('Error uploading image: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { title, category, content, excerpt } = formData;

      if (!title || !category || !selectedImage || !content || !excerpt) {
        throw new Error("All fields are required.");
      }

      // Upload image first
      const imageUrl = await uploadImage(selectedImage);

      const newBlog = {
        id: Date.now(),
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

      addBlog(newBlog);
      navigate('/');

    } catch (err) {
      setError(err.message || "Unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-25"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 max-w-2xl mx-auto text-center"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                Create Your Story
              </h1>
              <p className="text-base sm:text-lg text-indigo-100 leading-relaxed">
                Share your insights and inspire others with your unique perspective
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <div className="p-4 sm:p-6 lg:p-8">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl flex justify-between items-start"
                >
                  <div>
                    <p className="font-medium">Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                  <button 
                    onClick={() => setError(null)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Title Input */}
                <motion.div 
                  className="form-group md:col-span-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <FaHeading className="mr-2 text-indigo-600" />
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-base sm:text-lg"
                    placeholder="Enter an engaging title..."
                    required
                  />
                </motion.div>

                {/* Category Input */}
                <motion.div 
                  className="form-group md:col-span-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <FaTags className="mr-2 text-indigo-600" />
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white text-base sm:text-lg appearance-none"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Technology">Technology</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </motion.div>

                {/* Image Upload */}
                <motion.div 
                  className="form-group md:col-span-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <FaImage className="mr-2 text-indigo-600" />
                    Cover Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="w-full px-4 sm:px-6 py-8 rounded-xl border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <FaUpload className="text-3xl sm:text-4xl text-gray-400 mb-2" />
                      <span className="text-gray-600 text-sm sm:text-base">Click to upload image</span>
                      <span className="text-xs sm:text-sm text-gray-500 mt-1">Max size: 5MB</span>
                    </label>
                  </div>

                  {/* Image Preview */}
                  <AnimatePresence>
                    {imagePreview && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mt-4 rounded-xl overflow-hidden shadow-xl bg-gray-100 aspect-video relative group"
                      >
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                        >
                          <FaTimes className="text-gray-600" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Excerpt Input */}
                <motion.div 
                  className="form-group md:col-span-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <FaQuoteLeft className="mr-2 text-indigo-600" />
                    Excerpt
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-base sm:text-lg"
                    placeholder="Write a compelling summary..."
                    rows="3"
                    required
                  ></textarea>
                </motion.div>

                {/* Content Input */}
                <motion.div 
                  className="form-group md:col-span-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                    <FaFileAlt className="mr-2 text-indigo-600" />
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-base sm:text-lg"
                    placeholder="Tell your story..."
                    rows="8"
                    required
                  ></textarea>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors duration-300 text-base sm:text-lg font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-purple-500/25 text-base sm:text-lg font-medium"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner className="w-5 h-5 mr-3" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <FaMagic className="mr-2" />
                      Publish Story
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateBlog;
