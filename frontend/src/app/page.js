"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { GraduationCap, Users, ShieldCheck, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative bg-white overflow-hidden">
        <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center">
          {/* Left Text */}
          <div className="md:w-1/2 mb-10 md:mb-0 z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Manage Your School <br />
              <span className="text-indigo-600">Efficiently.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              A complete solution for Admins, Teachers, and Students. Handles
              assignments, report cards, classes, and attendance in one
              beautiful dashboard.
            </p>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="md:w-1/2 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            {/* Dashboard Preview Card (Visual Only) */}
            <div className="relative bg-white/60 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  <GraduationCap />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Student Portal</h3>
                  <p className="text-sm text-gray-500">View grades instantly</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-24 bg-indigo-50 rounded-lg mt-4 border border-indigo-100 flex items-center justify-center text-indigo-400">
                  Active Assignment: Math Final
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform bridges the gap between students, teachers, and
              administrators with seamless tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Role-Based Access</h3>
              <p className="text-gray-500 leading-relaxed">
                Dedicated dashboards for Admins, Teachers, and Students ensuring
                secure and relevant access.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Academic Tracking</h3>
              <p className="text-gray-500 leading-relaxed">
                Easily manage report cards, track attendance, and monitor
                assignment submissions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure & Fast</h3>
              <p className="text-gray-500 leading-relaxed">
                Built with Next.js and secure authentication to keep school data
                safe and accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500">
            © 2024 School Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
