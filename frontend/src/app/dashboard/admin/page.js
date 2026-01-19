"use client";
import { useState, useEffect } from "react";
import API from "@/libs/api";
import Cookies from "js-cookie";
import Sidebar from "@/components/Sidebar";
import StatsCard from "@/components/StatsCard";
import AdminRegisterModal from "@/components/admin/AdminRegisterModal";
import EditUserModal from "@/components/admin/EditUserModal";
import GenericCrudTable from "@/components/admin/GenericCrudTable";
import ClassTable from "@/components/admin/ClassTable"; // Fixed import path (removed dot)
import CreateClassModal from "@/components/admin/CreateClassModal";
import {
  Users,
  School,
  UserPlus,
  GraduationCap,
  Briefcase,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  // Modal States
  const [showRegister, setShowRegister] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // --- FIXED FETCH DATA FUNCTION ---
  const fetchData = async () => {
    try {
      const token = Cookies.get("authToken");

      // 1. Guard Clause: If no token, we can't fetch.
      if (!token) {
        console.error("NO TOKEN FOUND");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      // 2. Fetch all data in parallel
      const [tRes, sRes, cRes] = await Promise.all([
        API.get("/teacher", { headers }),
        API.get("/student", { headers }),
        API.get("/class", { headers }),
      ]);

      // 3. Robust Data Extraction (Handles both { data: [...] } and [...])
      const teachersData = Array.isArray(tRes.data)
        ? tRes.data
        : tRes.data?.data || [];

      const studentsData = Array.isArray(sRes.data)
        ? sRes.data
        : sRes.data?.data || [];

      const classesData = Array.isArray(cRes.data)
        ? cRes.data
        : cRes.data?.data || [];

      // 4. Update State
      setTeachers(teachersData);
      setStudents(studentsData);
      setClasses(classesData);
    } catch (e) {
      console.error("Fetch Error:", e);
      // Optional: Redirect to login if token is expired
      if (e.response?.status === 401) {
        alert("Session expired. Please login again.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (type, id) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const token = Cookies.get("authToken");
      await API.delete(`/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData(); // Refresh data
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-900">
      <Sidebar role="ADMIN" activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Admin Portal
          </h1>
          <div className="flex gap-3">
            {activeTab === "classes" && (
              <button
                onClick={() => setShowClassModal(true)}
                className="bg-white border border-indigo-200 text-indigo-700 px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition"
              >
                <School size={20} /> Add Class
              </button>
            )}

            <button
              onClick={() => setShowRegister(true)}
              className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition active:scale-95"
            >
              <UserPlus size={20} /> Register User
            </button>
          </div>
        </div>

        {/* --- TAB CONTENT --- */}

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            <StatsCard
              title="Total Students"
              value={students.length}
              icon={<GraduationCap size={24} />}
              color="indigo"
            />
            <StatsCard
              title="Total Teachers"
              value={teachers.length}
              icon={<Briefcase size={24} />}
              color="green"
            />
            <StatsCard
              title="Active Classes"
              value={classes.length}
              icon={<School size={24} />}
              color="blue"
            />
          </div>
        )}

        {activeTab === "classes" && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-slate-700">
              Class Management
            </h2>
            <ClassTable
              classes={classes}
              onDelete={(id) => handleDelete("class", id)}
            />
          </div>
        )}

        {activeTab === "teachers" && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-slate-700">
              Teacher Directory
            </h2>
            <GenericCrudTable
              data={teachers}
              type="TEACHER"
              onDelete={(id) => handleDelete("teacher", id)}
              onEdit={(user) => setEditingUser({ user, type: "TEACHER" })}
            />
          </div>
        )}

        {activeTab === "students" && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-slate-700">
              Student Directory
            </h2>
            <GenericCrudTable
              data={students}
              type="STUDENT"
              onDelete={(id) => handleDelete("student", id)}
              onEdit={(user) => setEditingUser({ user, type: "STUDENT" })}
            />
          </div>
        )}

        {/* --- MODALS --- */}
        {showRegister && (
          <AdminRegisterModal
            onClose={() => setShowRegister(false)}
            onSuccess={() => {
              setShowRegister(false);
              fetchData();
            }}
          />
        )}

        {showClassModal && (
          <CreateClassModal
            teachers={teachers}
            onClose={() => setShowClassModal(false)}
            onSuccess={() => {
              setShowClassModal(false);
              fetchData();
            }}
          />
        )}

        {editingUser && (
          <EditUserModal
            user={editingUser.user}
            type={editingUser.type}
            onClose={() => setEditingUser(null)}
            onSuccess={() => {
              setEditingUser(null);
              fetchData();
            }}
          />
        )}
      </main>
    </div>
  );
}
