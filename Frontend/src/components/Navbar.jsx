import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import defaultUserImg from '../assets/img11.png';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('user-updated'));
    navigate('/login');
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      {/* Overlay for closing navbar on outside click (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-tra md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <nav className="bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg p-5 lg:pl-36 lg:pr-36 sticky top-0 z-[999]">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
            <Link to="/" className="text-2xl font-bold text-white tracking-tight">
              Genimeds
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
            </svg>
          </button>

          {/* Navigation Links */}
          <ul
            className={`md:flex md:space-x-20 ${isOpen ? 'block' : 'hidden'} md:block absolute  md:static top-16 left-0 w-full md:w-auto transition-all duration-300 ease-in-out
              ${isOpen ? 'bg-gray-400 animate-slideDown' : 'bg-transparent'}`}
            style={{ zIndex: 50 }}
          >
            <li className="md:inline-block">
              <Link
                to="/"
                className="block text-white font-semibold text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>

            <li className="md:inline-block">
              <Link
                to="/about"
                className="block text-white font-semibold text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
                        <li className="md:inline-block">
              <Link
                to="/medicine"
                className="block text-white font-semibold text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
                onClick={() => setIsOpen(false)}
              >
                Generic Med
              </Link>
            </li>
            <li className="md:inline-block">
              <Link
                to="/contact"
                className="block text-white font-semibold text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li className="md:inline-block">
              <Link
                to="/profile"
                className="block text-white font-semibold text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </li>
    <li className="relative md:inline-block" ref={dropdownRef}>
      {user ? (
        <div className="group relative inline-block">
          <button className="focus:outline-none" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img
              src={user.photoURL || 'https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png'}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-2 border">
              <div className="px-4 py-2 text-sm text-gray-800 font-semibold">{user.displayName}</div>
              <div className="px-4 text-sm text-gray-500">{user.email}</div>
              <hr className="my-2" />
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="block px-4 py-6 md:px-0 md:py-0">
          <img
            src={defaultUserImg}
            alt="Login"
            className="w-8 h-8 rounded-full object-cover border-2 border-white"
          />
        </Link>
      )}
    </li>


          </ul>
        </div>

        {/* Inline CSS for animation */}
        <style>
          {`
            @keyframes slideDown {
              0% {
                opacity: 0;
                transform: translateY(-20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-slideDown {
              animation: slideDown 0.4s ease-in-out forwards;
            }
          `}
        </style>
      </nav>
    </>
  );
}

export default Navbar;