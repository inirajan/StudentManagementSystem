import React from "react";
import { FaMoon, FaSun, FaBell, FaSearch } from "react-icons/fa";

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <nav className="h-16 bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-gray-800 flex justify-between items-center px-4 md:px-8 sticky top-0 z-40 transition-colors">
      {/* Left: Search utility for responsiveness */}
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg w-40 md:w-64">
        <FaSearch className="text-gray-400 mr-2 text-sm" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none text-sm focus:outline-none dark:text-white w-full"
        />
      </div>

      {/* Right: Theme Toggle & Notifications */}
      <div className="flex items-center space-x-3 md:space-x-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-105 transition-transform"
        >
          {isDarkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-blue-600" />
          )}
        </button>
        <button className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
          <FaBell />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
