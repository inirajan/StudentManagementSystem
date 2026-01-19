"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          Welcome Back
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(form.email, form.password);
          }}
          className="space-y-6"
        >
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
