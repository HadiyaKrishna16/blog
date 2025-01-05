import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaHeart, FaRss, FaMedium } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Blog', href: '/blog' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Support', href: '/support' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' }
    ],
    social: [
      { name: 'GitHub', icon: FaGithub, href: 'https://github.com' },
      { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com' },
      { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com' },
      { name: 'Medium', icon: FaMedium, href: 'https://medium.com' }
    ]
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg"
              >
                <FaRss className="text-white text-xl" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Blog
              </span>
            </Link>
            <p className="text-gray-500 text-sm">
              Share your knowledge and experiences with our growing developer community.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <item.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link 
                    to={link.href}
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link 
                    to={link.href}
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="text-sm text-gray-500 mb-4">
              Get the latest updates and articles delivered straight to your inbox.
            </p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500 flex items-center space-x-1">
              <span>&copy; {currentYear} DevBlog. Made with</span>
              <FaHeart className="text-red-500 w-4 h-4" />
              <span>by developers for developers.</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                Privacy
              </Link>
              <Link to="/cookies" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 