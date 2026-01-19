"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import API from "@/libs/api";
import Sidebar from "@/components/Sidebar";
import StatsCard from "@/components/StatsCard";
// ... imports

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = Cookies.get("authToken");

    if (!storedUser || storedUser === "undefined" || !token) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchDashboardData = async () => {
      try {
        const { data } = await API.get("/student", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const me = data.find((s) => s.user?._id === parsedUser._id);
        setProfile(me || null); // Set null if not found
      } catch (error) {
        if (error.response?.status === 401) router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [router]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  // IF NO PROFILE IS FOUND -> Show Error (Don't show form)
  if (!profile)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
        <h2 className="text-2xl font-black text-rose-600">
          Profile Not Set Up
        </h2>
        <p className="text-gray-600 mt-2">
          The Admin has not linked your student details yet.
        </p>
        <p className="text-sm text-gray-500">
          Please contact the school office.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-6 text-indigo-600 underline font-bold"
        >
          Back to Login
        </button>
      </div>
    );

  // IF PROFILE EXISTS -> Show Dashboard directly
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="STUDENT" activeTab="overview" />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Roll No"
            value={profile.rollNumber}
            color="indigo"
          />
          <StatsCard title="Class" value={profile.classRoom} color="green" />
          <StatsCard title="Parent" value={profile.parentName} color="blue" />
        </div>
        {/* Add your Assignments/Reports components here */}
      </main>
    </div>
  );
}
