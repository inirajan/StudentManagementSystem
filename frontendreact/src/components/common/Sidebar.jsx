import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserGraduate, FaChalkboardTeacher, FaBook, FaLayerGroup } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", to: "/dashboard", icon: <FaLayerGroup /> },
    { name: "Students", to: "/students", icon: <FaUserGraduate /> },
    { name: "Teachers", to: "/teachers", icon: <FaChalkboardTeacher /> },
    { name: "Classes", to: "/classes", icon: <FaLayerGroup /> },
    { name: "Subjects", to: "/subjects", icon: <FaBook /> },
  ];

  return (
    <>
      <div className="md:hidden flex justify-between items-center bg-gray-800 text-white p-4">
        <span className="font-bold text-lg">StudentMS</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`
          fixed top-0 left-0 h-full bg-gray-800 text-white p-5
          w-64 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex-shrink-0
        `}
      >
        <div className="hidden md:flex items-center mb-8">
          <span className="font-bold text-xl">StudentMS</span>
        </div>

        <nav className="space-y-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
