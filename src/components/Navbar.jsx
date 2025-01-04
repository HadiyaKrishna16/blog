import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import { FaBook, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    toggleDropdown();
  };

  const handleViewProfile = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate(`/user/${user.id}`);
  };

  const handleClickOutside = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="bg-white shadow">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FaBook className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-blue-600 hidden sm:block">Blog</span>
            </Link>
          </div>

          {/* Search Bar - Hidden on Mobile */}
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-center max-w-2xl mx-4">
            <div className="w-full flex items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-full px-5 py-2 w-full focus:outline-none focus:border-blue-500"
              />
              {user && (
                <Link 
                  to="/create-blog" 
                  className="whitespace-nowrap bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Create Blog
                </Link>
              )}
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative">
                <div 
                  className="flex items-center space-x-3 cursor-pointer" 
                  onClick={handleDropdownClick}
                >
                  <img
                    src={user.imageUrl}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-blue-600">{user.username || user.firstName}</span>
                </div>
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-[calc(100%+1rem)] w-72 bg-white border rounded-lg shadow-lg z-10">
                    {/* Profile Preview */}
                    <div className="p-4">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={user.imageUrl}
                          alt="User Avatar"
                          className="w-16 h-16 rounded-full border-2 border-blue-100"
                        />
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {user.fullName || user.username}
                          </h3>
                          <p className="text-sm text-gray-600">Blogger</p>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-2 mb-4 text-center">
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="text-sm font-medium truncate">
                            {user.primaryEmailAddress?.emailAddress}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-sm text-gray-600">Joined</p>
                          <p className="text-sm font-medium">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="border-t pt-2 space-y-1">
                        <button
                          onClick={handleViewProfile}
                          className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-50 rounded-md transition flex items-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          View Full Profile
                        </button>
                        <SignOutButton>
                          <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 rounded-md transition flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                            </svg>
                            Logout
                          </button>
                        </SignOutButton>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-blue-600 hover:text-blue-700 transition">Login</Link>
                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:text-blue-700 focus:outline-none"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          {/* Mobile Search */}
          <div className="px-4 pt-2 pb-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Mobile Create Blog Button */}
          {user && (
            <div className="px-4 py-2">
              <Link 
                to="/create-blog" 
                className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Create Blog
              </Link>
            </div>
          )}

          {/* Mobile User Menu */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="px-4 space-y-3">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      src={user.imageUrl}
                      alt="User Avatar"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.fullName || user.username}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.primaryEmailAddress?.emailAddress}
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={handleViewProfile}
                    className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-50 rounded-md transition flex items-center gap-2"
                  >
                    View Profile
                  </button>
                  <SignOutButton>
                    <button 
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 rounded-md transition flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Logout
                    </button>
                  </SignOutButton>
                </div>
              </div>
            ) : (
              <div className="px-4 space-y-2">
                <Link 
                  to="/login" 
                  className="block text-center text-blue-600 px-4 py-2 hover:bg-gray-50 rounded-md transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
