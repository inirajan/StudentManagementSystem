import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  FaThLarge,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaLayerGroup,
  FaBook,
  FaFileAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaEdit,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 1. Define links and the specific roles that can see them
  const allLinks = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: <FaThLarge />,
      roles: ["ADMIN"],
    },
    {
      name: "My Dashboard",
      to: "/student-dashboard",
      icon: <FaThLarge />,
      roles: ["STUDENT"],
    },
    {
      name: "Dashboard",
      to: "/teacher-dashboard",
      icon: <FaThLarge />,
      roles: ["TEACHER"],
    },
    {
      name: "Students",
      to: "/students",
      icon: <FaUserGraduate />,
      roles: ["ADMIN"],
    },
    {
      name: "Teachers",
      to: "/teachers",
      icon: <FaChalkboardTeacher />,
      roles: ["ADMIN"],
    },
    {
      name: "Classes",
      to: "/classes",
      icon: <FaLayerGroup />,
      roles: ["ADMIN"],
    },
    { name: "Subjects", to: "/subjects", icon: <FaBook />, roles: ["ADMIN"] },
    {
      name: "Assignments",
      to: "/assignments",
      icon: <FaEdit />,
      roles: ["STUDENT", "TEACHER"],
    },
    {
      name: "Report Cards",
      to: "/reports",
      icon: <FaFileAlt />,
      roles: ["ADMIN", "STUDENT", "TEACHER"],
    },
  ];

  // 2. Extract the user's primary role
  const userRole = Array.isArray(user?.role) ? user.role[0] : user?.role;

  // 3. Filter the links list based on the user's role
  const filteredLinks = allLinks.filter((link) =>
    link.roles.includes(userRole),
  );

  if (loading) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-[60] p-2 bg-blue-600 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside
        className={`
        fixed top-0 left-0 h-full bg-[#0f172a] dark:bg-black text-gray-300 w-64 
        transform transition-transform duration-300 z-50 flex flex-col shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}
      >
        {/* User Identity Section */}
        <div className="p-8 border-b border-gray-800/50 flex flex-col items-center">
          <div className="relative mb-3">
            <FaUserCircle className="text-6xl text-blue-500 shadow-xl" />
            {user && (
              <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#0f172a] rounded-full"></div>
            )}
          </div>
          <h2 className="text-white font-bold text-center text-lg leading-tight truncate w-full px-2">
            {user?.name || "User"}
          </h2>
        </div>

        {/* Dynamic Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive ? "bg-blue-600 text-white shadow-lg" : "hover:bg-gray-800/50 hover:text-white"}
                `}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-sm tracking-wide">{link.name}</span>
              </NavLink>
            ))
          ) : (
            <div className="px-4 py-10 text-center">
              <p className="text-xs text-gray-500 italic">
                No modules available for your role.
              </p>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-bold group"
          >
            <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        />
      )}
    </>
  );
};

export default Sidebar;
