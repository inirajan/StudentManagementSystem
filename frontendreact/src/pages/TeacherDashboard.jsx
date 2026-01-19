import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/axios";
import {
  FaUserGraduate,
  FaClipboardList,
  FaBookOpen,
  FaPlus,
  FaFileAlt,
} from "react-icons/fa";

const TeacherDashboard = () => {
  const { user } = useAuth(); //
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    myStudents: 0,
    activeAssignments: 0,
    upcomingClasses: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        //
        const res = await api.get("/teacher/dashboard-stats");
        setStats(res.data.data);
      } catch (err) {
        console.error("Error loading dashboard stats", err);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="p-8 bg-gray-50 dark:bg-[#0f172a] min-h-screen transition-colors">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Teacher Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Welcome back, {user?.name || "Teacher"}. Here is an overview of your
          academic activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="My Students"
          value={stats.myStudents || "42"}
          icon={<FaUserGraduate />}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Assignments"
          value={stats.activeAssignments || "12"}
          icon={<FaClipboardList />}
          color="bg-purple-500"
        />
        <StatCard
          title="Course Subjects"
          value="4"
          icon={<FaBookOpen />}
          color="bg-green-500"
        />
      </div>

      {/* Recent Activity / Class List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Upcoming Classes
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div>
                <p className="font-bold text-gray-800 dark:text-white">
                  Mathematics - Grade 10A
                </p>
                <p className="text-xs text-gray-500">Room 302 • 10:30 AM</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full uppercase">
                In 20 Mins
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions - Linked to your routes */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/assignments")}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-center group"
            >
              <FaPlus className="mx-auto mb-2 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold dark:text-white">
                New Assignment
              </span>
            </button>
            <button
              onClick={() => navigate("/reports")}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition-all text-center group"
            >
              <FaFileAlt className="mx-auto mb-2 text-green-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold dark:text-white">
                Generate Reports
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center space-x-4 hover:shadow-md transition-all">
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

export default TeacherDashboard;
