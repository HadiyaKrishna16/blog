import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShare, FaRegBookmark, FaBookmark, FaRegComment, 
  FaTwitter, FaFacebook, FaLinkedin, FaLink, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const BlogCard = ({ blog }) => {
  const { likeBlog, shareBlog } = useBlog();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleShare = async (platform) => {
    try {
      let shareUrl = window.location.origin + '/blog/' + blog.id;
      let shareText = `Check out this blog: ${blog.title}`;

      switch (platform) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
          toast.success('Shared on Twitter!');
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
          toast.success('Shared on Facebook!');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
          toast.success('Shared on LinkedIn!');
          break;
        case 'copy':
          await navigator.clipboard.writeText(shareUrl);
          toast.success('Link copied to clipboard!');
          break;
        default:
          await shareBlog(blog.id);
      }
      setShowShareDialog(false);
    } catch (error) {
      toast.error('Failed to share');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <motion.img 
          src={blog.imageUrl} 
          alt={blog.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-sm text-indigo-600 text-sm font-medium px-3 py-1 rounded-full shadow-md"
          >
            {blog.category}
          </motion.span>
        </div>
      </div>

      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ x: 5 }}
          >
            <img 
              src={blog.author.avatar} 
              alt={blog.author.name}
              className="w-10 h-10 rounded-full border-2 border-purple-100"
            />
            <div>
              <p className="font-semibold text-gray-800">{blog.author.name}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{blog.readTime}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="text-gray-500 hover:text-indigo-600 transition-colors"
          >
            {isBookmarked ? <FaBookmark className="w-5 h-5" /> : <FaRegBookmark className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Title and Excerpt */}
        <Link to={`/blog/${blog.id}`} className="block group">
          <motion.h2 
            className="text-xl font-bold mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2"
            whileHover={{ x: 5 }}
          >
            {blog.title}
          </motion.h2>
          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => likeBlog(blog.id)}
              className="flex items-center space-x-2 group"
            >
              {blog.isLiked ? (
                <FaHeart className="w-5 h-5 text-red-500" />
              ) : (
                <FaRegHeart className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
              )}
              <span className={`${blog.isLiked ? 'text-red-500' : 'text-gray-500'} group-hover:text-red-500 transition-colors`}>
                {blog.likes}
              </span>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <FaRegComment className="w-5 h-5" />
              <span>12</span>
            </motion.button>
          </div>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowShareDialog(true)}
            className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <FaShare className="w-5 h-5" />
            <span className="text-sm">Share</span>
          </motion.button>
        </div>

        {/* Read More Link */}
        <Link to={`/blog/${blog.id}`}>
          <motion.div
            whileHover={{ x: 5 }}
            className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-700"
          >
            Read More
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </Link>
      </div>

      {/* Share Dialog */}
      <AnimatePresence>
        {showShareDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 relative"
            >
              <button
                onClick={() => setShowShareDialog(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-semibold mb-4">Share this blog</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('twitter')}
                  className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-[#1DA1F2] text-white hover:bg-opacity-90"
                >
                  <FaTwitter className="w-5 h-5" />
                  <span>Twitter</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-[#4267B2] text-white hover:bg-opacity-90"
                >
                  <FaFacebook className="w-5 h-5" />
                  <span>Facebook</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-[#0077B5] text-white hover:bg-opacity-90"
                >
                  <FaLinkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare('copy')}
                  className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-gray-800 text-white hover:bg-opacity-90"
                >
                  <FaLink className="w-5 h-5" />
                  <span>Copy Link</span>
                </motion.button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                Share this content with your friends and followers
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BlogCard; 
