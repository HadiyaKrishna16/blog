import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SignOutButton, SignInButton, useUser, useClerk } from '@clerk/clerk-react';
import { FaBook, FaBars, FaTimes, FaSearch, FaUserCircle, FaSignOutAlt, FaPen } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleViewProfile = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate(`/user/${user.id}`);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg"
            >
              <FaBook className="text-white text-xl" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Blog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-64 px-4 py-2 rounded-xl bg-gray-100 focus:bg-white border-2 border-transparent focus:border-purple-500 transition-all duration-300 focus:w-80 focus:outline-none"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {user && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/create-blog" 
                    className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <FaPen />
                    <span>Write</span>
                  </Link>
                </motion.div>
              )}

              {user ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2"
                    onClick={handleDropdownClick}
                  >
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-purple-200"
                    />
                  </motion.button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                      >
                        <div className="p-4 border-b">
                          <div className="flex items-center space-x-3">
                            <img
                              src={user.imageUrl}
                              alt="Profile"
                              className="w-12 h-12 rounded-full border-2 border-purple-100"
                            />
                            <div>
                              <p className="font-semibold text-gray-800">
                                {user.fullName || user.username}
                              </p>
                              <p className="text-sm text-gray-500">
                                {user.primaryEmailAddress?.emailAddress}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          <motion.button
                            whileHover={{ x: 5 }}
                            onClick={handleViewProfile}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-xl transition-colors duration-200 flex items-center space-x-2"
                          >
                            <FaUserCircle className="text-purple-500" />
                            <span>View Profile</span>
                          </motion.button>

                          <SignOutButton>
                            <motion.button
                              whileHover={{ x: 5 }}
                              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200 flex items-center space-x-2"
                            >
                              <FaSignOutAlt />
                              <span>Sign Out</span>
                            </motion.button>
                          </SignOutButton>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <SignInButton mode="modal">
                    <button className="text-gray-700 hover:text-purple-600 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SignInButton mode="modal">
                      <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300">
                        Get Started
                      </button>
                    </SignInButton>
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 py-2 rounded-xl bg-gray-100 focus:bg-white border-2 border-transparent focus:border-purple-500 transition-all"
                />
                <FaSearch className="absolute right-3 top-3 text-gray-400" />
              </div>

              {user && (
                <Link 
                  to="/create-blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl w-full"
                >
                  <FaPen />
                  <span>Write Article</span>
                </Link>
              )}

              {user ? (
                <div className="space-y-2">
                  <button
                    onClick={handleViewProfile}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 rounded-xl transition-colors flex items-center space-x-2"
                  >
                    <FaUserCircle />
                    <span>View Profile</span>
                  </button>
                  <SignOutButton>
                    <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center space-x-2">
                      <FaSignOutAlt />
                      <span>Sign Out</span>
                    </button>
                  </SignOutButton>
                </div>
              ) : (
                <div className="space-y-2">
                  <SignInButton mode="modal">
                    <button className="w-full text-center text-gray-700 hover:text-purple-600 transition-colors py-2">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <button className="w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl">
                      Get Started
                    </button>
                  </SignInButton>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
