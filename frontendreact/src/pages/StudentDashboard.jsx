import React from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  FaUserCircle,
  FaGraduationCap,
  FaClipboardList,
  FaCalendarAlt,
} from "react-icons/fa";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 lg:p-10 bg-gray-50 dark:bg-[#0f172a] min-h-screen transition-colors">
      {/* Welcome Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome back, {user?.name || "Student"}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here is what is happening with your studies today.
          </p>
        </div>
        <div className="hidden md:block">
          <FaUserCircle className="text-5xl text-blue-500" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Enrolled Courses"
          value="5"
          icon={<FaGraduationCap />}
          color="bg-blue-500"
        />
        <StatCard
          title="Assignments Due"
          value="3"
          icon={<FaClipboardList />}
          color="bg-orange-500"
        />
        <StatCard
          title="Attendance"
          value="92%"
          icon={<FaCalendarAlt />}
          color="bg-green-500"
        />
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Current Announcements
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
              Final Exams Schedule Updated
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Please check the portal for your individual exam dates and venues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center space-x-4">
    <div className={`${color} p-4 rounded-xl text-white text-2xl shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
        {title}
      </p>
      <h2 className="text-2xl font-black text-gray-800 dark:text-white">
        {value}
      </h2>
    </div>
  </div>
);

export default StudentDashboard;
