import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import { FaBook } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useUser();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    toggleDropdown();
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
    <nav className="bg-white p-2 flex justify-between items-center shadow">
      <div className="flex items-center">
        <Link to="/" className="text-blue-600 font-bold flex items-center mr-2">
          <FaBook className="mr-1" />
          Blog
        </Link>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-full px-3 py-1 w-1/2"
        />
        {user && (
          <Link to="/create-blog" className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-lg">Create Blog</Link>
        )}
      </div>
      <div className="flex items-center relative">
        {user ? (
          <>
            {user.imageUrl && (
              <img
                src={user.imageUrl}
                alt="User Avatar"
                className="w-10 h-10 rounded-full mr-2 cursor-pointer"
                onClick={handleDropdownClick}
              />
            )}
            <span className="text-blue-600 cursor-pointer" onClick={handleDropdownClick}>
              {user.username || user.firstName}
            </span>
            {dropdownOpen && (
              <div className="absolute right-0 mt-16 w-48 bg-white border rounded shadow-lg z-10 p-4">
                <div className="flex items-center mb-2">
                  <img
                    src={user.imageUrl}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full mr-2"
                  />
                  <div>
                    <p className="font-bold">{user.username || user.firstName}</p>
                    <p className="text-gray-600">Bloger</p>
                  </div>
                </div>
                <center>
                <SignOutButton>
                  <button className="w-full text-left px-4 py-1 text-red-600 hover:bg-gray-100">Logout</button>
                </SignOutButton>
                </center>
              </div>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 ml-2">Login</Link>
            <Link to="/signup" className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-lg">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
