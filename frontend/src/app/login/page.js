"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/libs/authHelper";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ identifier: "", password: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(form.identifier, form.password, router);
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          Welcome Back
        </h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Email or Phone
            </label>
            <input
              type="text"
              required
              placeholder="98XXXXXXXX or email@test.com"
              className="w-full border border-gray-400 p-3 rounded-lg bg-gray-50 text-black outline-none font-medium"
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full border border-gray-400 p-3 rounded-lg bg-gray-50 text-black outline-none font-medium"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
            Sign In
          </button>
        </form>
        <p className="text-center mt-6 text-xs text-gray-400">
          Contact Admin to reset password or create account.
        </p>
      </div>
    </div>
  );
}
