import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useBlog } from '../../context/BlogContext';
import Navbar from '../Navbar';
import BlogCard from '../Blog/BlogCard';
import Footer from '../Footer';
import { motion } from 'framer-motion';
import { FaEdit, FaMapMarkerAlt, FaGithub, FaTwitter, FaLinkedin, FaGlobe, FaChartLine } from 'react-icons/fa';

const UserProfile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useUser();
  const { blogs } = useBlog();
  const [activeTab, setActiveTab] = useState('posts');

  // Filter blogs by this user
  const userBlogs = blogs.filter(blog => 
    blog.author.name === (currentUser?.fullName || currentUser?.username)
  );

  const stats = {
    posts: userBlogs.length,
    views: userBlogs.reduce((total, blog) => total + blog.views, 0),
    likes: userBlogs.reduce((total, blog) => total + blog.likes, 0),
    comments: userBlogs.reduce((total, blog) => total + (blog.comments?.length || 0), 0)
  };

  const tabContent = {
    posts: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userBlogs.length > 0 ? (
          userBlogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600">No posts yet</h3>
            <p className="text-gray-500 mt-2">Start sharing your knowledge with the community</p>
          </div>
        )}
      </div>
    ),
    about: (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">About Me</h3>
        <p className="text-gray-600 mb-6">
          {currentUser?.publicMetadata?.bio || "No bio available"}
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <FaMapMarkerAlt className="text-indigo-500" />
            <span>{currentUser?.publicMetadata?.location || "Location not specified"}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <FaGlobe className="text-indigo-500" />
            <a href={currentUser?.publicMetadata?.website} className="hover:text-indigo-600 transition-colors">
              {currentUser?.publicMetadata?.website || "Website not specified"}
            </a>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid opacity-10"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group"
                >
                  <img
                    src={currentUser?.imageUrl}
                    alt={currentUser?.fullName}
                    className="w-32 h-32 rounded-full border-4 border-white/20 shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FaEdit className="text-white text-2xl" />
                  </div>
                </motion.div>

                <div className="text-center md:text-left">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold mb-2"
                  >
                    {currentUser?.fullName || currentUser?.username}
                  </motion.h1>
                  <p className="text-indigo-100 mb-4">
                    {currentUser?.publicMetadata?.role || "Community Member"}
                  </p>
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    {[FaGithub, FaTwitter, FaLinkedin].map((Icon, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {Object.entries(stats).map(([key, value]) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center"
                  >
                    <h3 className="text-2xl font-bold">{value}</h3>
                    <p className="text-indigo-100 capitalize">{key}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b">
          {['posts', 'about'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm transition-colors relative ${
                activeTab === tab
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabContent[activeTab]}
        </motion.div>
      </div>

      {/* Analytics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FaChartLine className="text-indigo-500" />
              Content Analytics
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Avg. Views per Post', value: Math.round(stats.views / stats.posts) || 0 },
              { label: 'Avg. Likes per Post', value: Math.round(stats.likes / stats.posts) || 0 },
              { label: 'Engagement Rate', value: `${Math.round((stats.likes / stats.views) * 100 || 0)}%` }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile; 
