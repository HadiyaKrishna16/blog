import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useBlog } from '../../context/BlogContext';
import Navbar from '../Navbar';
import BlogCard from '../Blog/BlogCard';

const UserProfile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useUser();
  const { blogs } = useBlog();
  const [showDetails, setShowDetails] = useState(false);

  // Filter blogs by this user
  const userBlogs = blogs.filter(blog => 
    blog.author.name === (currentUser?.fullName || currentUser?.username)
  );

  const totalViews = userBlogs.length * 100; // Example calculation
  const joinDate = new Date(currentUser?.createdAt).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative group">
              <img
                src={currentUser?.imageUrl}
                alt={currentUser?.fullName}
                className="w-32 h-32 rounded-full border-4 border-blue-100"
              />
              {showDetails && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="text-center sm:text-left flex-grow">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {currentUser?.fullName || currentUser?.username}
                  </h1>
                  <p className="text-gray-600">Blogger</p>
                </div>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  {showDetails ? 'Hide Details' : 'View Details'}
                </button>
              </div>

              {showDetails && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-lg mb-2">Profile Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium">{currentUser?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Joined</p>
                      <p className="font-medium">{joinDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Username</p>
                      <p className="font-medium">@{currentUser?.username}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Views</p>
                      <p className="font-medium">{totalViews}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                <div className="text-center bg-blue-50 p-3 rounded-lg">
                  <span className="block text-2xl font-bold text-blue-600">{userBlogs.length}</span>
                  <span className="text-gray-600">Posts</span>
                </div>
                <div className="text-center bg-blue-50 p-3 rounded-lg">
                  <span className="block text-2xl font-bold text-blue-600">
                    {userBlogs.reduce((total, blog) => total + blog.likes, 0)}
                  </span>
                  <span className="text-gray-600">Total Likes</span>
                </div>
                <div className="text-center bg-blue-50 p-3 rounded-lg">
                  <span className="block text-2xl font-bold text-blue-600">
                    {totalViews}
                  </span>
                  <span className="text-gray-600">Views</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User's Blogs */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Published Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBlogs.length > 0 ? (
              userBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center py-8">
                No blogs published yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 