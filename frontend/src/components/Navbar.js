"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LogIn, LayoutDashboard, LogOut, School } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    // 1. Clear Data
    Cookies.remove("authToken");
    localStorage.removeItem("user");
    setUser(null);

    // 2. Redirect to Home Page instead of Login
    router.push("/");
  };

  return (
    <nav className="bg-white border-b border-indigo-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-black text-indigo-700 flex items-center gap-2 tracking-tighter uppercase"
        >
          <School size={28} /> Portal<span className="text-slate-900">SMS</span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-sm font-bold text-slate-500 hidden md:block">
                Hi, {user.name}
              </span>
              <Link
                href={`/dashboard/${user.role[0].toLowerCase()}`}
                className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-bold transition"
              >
                <LayoutDashboard size={20} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-rose-500 hover:text-rose-600 font-bold transition ml-2"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              <LogIn size={18} />
              Access Portal
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
