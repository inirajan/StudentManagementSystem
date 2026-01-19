"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  School,
  UserCircle,
  Users,
  LogOut,
} from "lucide-react";

export default function Sidebar({ role, activeTab, setActiveTab }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined")
      setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const menus = {
    STUDENT: [
      {
        id: "overview",
        label: "Dashboard",
        icon: <LayoutDashboard size={22} />,
      },
      { id: "assignments", label: "Assignments", icon: <BookOpen size={22} /> },
      { id: "reportCard", label: "Reports", icon: <GraduationCap size={22} /> },
    ],
    ADMIN: [
      {
        id: "overview",
        label: "Dashboard",
        icon: <LayoutDashboard size={22} />,
      },
      { id: "classes", label: "Classes", icon: <School size={22} /> },
      { id: "teachers", label: "Teachers", icon: <UserCircle size={22} /> },
      { id: "students", label: "Students", icon: <Users size={22} /> },
    ],
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl h-screen sticky top-0 border-r border-slate-800">
      <div className="p-8 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
          <School size={26} className="text-white" />
        </div>
        <h1 className="text-2xl font-black tracking-tight">
          Portal<span className="text-indigo-500">SMS</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {(menus[role] || []).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
              activeTab === item.id
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 font-bold"
                : "text-slate-400 hover:bg-slate-800 hover:text-white font-medium"
            }`}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-5 bg-slate-800/40 m-4 rounded-3xl border border-slate-700/50">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white shadow-lg">
            {user?.name?.charAt(0)}
          </div>
          <div className="truncate">
            <p className="text-sm font-black text-white">{user?.name}</p>
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">
              {role}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-rose-500/10 text-rose-500 rounded-xl text-xs font-black hover:bg-rose-500 hover:text-white w-full transition-all border border-rose-500/20"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}
