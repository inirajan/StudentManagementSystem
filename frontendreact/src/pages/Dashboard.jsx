import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaLayerGroup,
  FaBook,
  FaChartLine,
  FaClipboardList,
} from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for Admin view
  const [adminStats, setAdminStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    subjects: 0,
  });

  // State for Student view
  const [studentStats, setStudentStats] = useState({
    profile: null,
    assignments: 0,
    latestReport: null,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (user?.role?.includes("ADMIN")) {
          // ADMIN LOGIC: Fetch all collections to get counts
          const [stuRes, teaRes, clsRes] = await Promise.all([
            api.get("/student").catch(() => ({ data: { data: [] } })),
            api.get("/teacher").catch(() => ({ data: { data: [] } })),
            api.get("/class").catch(() => ({ data: { data: [] } })),
          ]);

          // Extract unique subjects from teacher assignments
          const subjects = [
            ...new Set(
              teaRes.data.data?.flatMap((t) =>
                t.assignedClasses
                  ? t.assignedClasses.map((ac) => ac.Subject)
                  : [],
              ),
            ),
          ];

          setAdminStats({
            students: stuRes.data.data?.length || 0,
            teachers: teaRes.data.data?.length || 0,
            classes: clsRes.data.data?.length || 0,
            subjects: subjects.length || 0,
          });
        } else if (user?.role?.includes("STUDENT")) {
          // STUDENT LOGIC: Fetch personal profile and related data
          const [profRes, repRes] = await Promise.all([
            api.get(`/student/${user._id}`).catch(() => null),
            api
              .get(`/report-card/student/${user._id}`)
              .catch(() => ({ data: { data: [] } })),
          ]);

          const profile = profRes?.data?.data || null;

          // Fetch assignments for the student's specific class
          let asmCount = 0;
          if (profile?.classRoom?._id) {
            const asmRes = await api.get(
              `/assignment?classId=${profile.classRoom._id}`,
            );
            asmCount = asmRes.data.data?.length || 0;
          }

          setStudentStats({
            profile,
            assignments: asmCount,
            latestReport: repRes.data.data?.[0] || null,
          });
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Could not load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
        Loading dashboard...
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {user?.role?.includes("ADMIN")
            ? "Admin Overview"
            : `Welcome, ${user?.name}`}
        </h1>
        <p className="text-gray-500">System status and academic summary.</p>
      </header>

      {user?.role?.includes("ADMIN") ? (
        // ADMIN GRID
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={adminStats.students}
            icon={<FaUserGraduate />}
            color="blue"
          />
          <StatCard
            title="Total Teachers"
            value={adminStats.teachers}
            icon={<FaChalkboardTeacher />}
            color="green"
          />
          <StatCard
            title="Active Classes"
            value={adminStats.classes}
            icon={<FaLayerGroup />}
            color="purple"
          />
          <StatCard
            title="Total Subjects"
            value={adminStats.subjects}
            icon={<FaBook />}
            color="orange"
          />
        </div>
      ) : (
        // STUDENT GRID
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Current GPA"
              value={studentStats.profile?.currentGPA || "N/A"}
              icon={<FaChartLine />}
              color="blue"
            />
            <StatCard
              title="Attendance"
              value={studentStats.profile?.attendanceRate || "0%"}
              icon={<FaUserGraduate />}
              color="green"
            />
            <StatCard
              title="Assignments"
              value={studentStats.assignments}
              icon={<FaBook />}
              color="orange"
            />
          </div>

          {studentStats.latestReport && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-700 mb-4">
                Latest Result: {studentStats.latestReport.examType}
              </h3>
              <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl">
                <span className="text-2xl font-black text-blue-900">
                  {studentStats.latestReport.overallGrade}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${studentStats.latestReport.status === "Pass" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {studentStats.latestReport.status}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Reusable Card Component
const StatCard = ({ title, value, icon, color }) => {
  const themes = {
    blue: "text-blue-600 bg-blue-50 border-blue-200",
    green: "text-green-600 bg-green-50 border-green-200",
    purple: "text-purple-600 bg-purple-50 border-purple-200",
    orange: "text-orange-600 bg-orange-50 border-orange-200",
  };
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-center hover:shadow-md transition">
      <div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
          {title}
        </p>
        <h2 className="text-3xl font-black text-gray-800 mt-1">{value}</h2>
      </div>
      <div className={`p-4 rounded-xl ${themes[color]}`}>{icon}</div>
    </div>
  );
};

export default Dashboard;
