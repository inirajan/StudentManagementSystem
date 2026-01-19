import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Class from "../pages/Class";
import StudentManager from "../pages/StudentManager";
import Teacher from "../pages/Teacher";
import ClassManager from "../pages/ClassManager";
import SubjectManager from "../pages/SubjectManager";
import ReportCardPage from "../pages/ReportCardPage";
import StudentDashboard from "../pages/StudentDashboard";
import Assignments from "../pages/Assignment";
import TeacherDashboard from "../pages/TeacherDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Layout Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<StudentManager />} />

        <Route path="/teachers" element={<Teacher />} />
        <Route path="/classes" element={<ClassManager />} />
        <Route path="/subjects" element={<SubjectManager />} />
        <Route path="/reports" element={<ReportCardPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/assignments" element={<Assignments />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
