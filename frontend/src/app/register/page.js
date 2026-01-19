"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/libs/authHelper";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "MALE",
    city: "",
    street: "",
    province: "",
    role: "STUDENT",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...form,
      age: Number(form.age),
      address: {
        city: form.city,
        street: form.street,
        province: form.province,
        country: "Nepal",
      },
    };
    handleRegister(finalData, router);
  };

  const inputStyle =
    "w-full border border-gray-400 p-3 rounded-lg bg-gray-50 text-black outline-none font-medium";

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-8">
          Create Account
        </h1>
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-900 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className={inputStyle}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            required
            className={inputStyle}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            required
            className={inputStyle}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={inputStyle}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            required
            className={inputStyle}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />

          <select
            className={inputStyle}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>

          <select
            className={inputStyle}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>

          <div className="md:col-span-2 grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Province"
              required
              className={inputStyle}
              onChange={(e) => setForm({ ...form, province: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              required
              className={inputStyle}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Street"
              required
              className={inputStyle}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
            />
          </div>

          <button className="md:col-span-2 w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 shadow-md text-lg mt-4">
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-gray-800 font-medium">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-700 font-bold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
