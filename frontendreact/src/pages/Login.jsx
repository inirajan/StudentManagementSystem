import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { HiLockClosed } from "react-icons/hi2";
import { loginRequest } from "../api/auth.api";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginRequest({ email, password });
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-md">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Student Management System
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Academic Records & Administration Portal
          </p>
        </div>

        {/* Info Box */}
        <div className="mb-5 bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-md px-4 py-3 text-sm text-blue-700 dark:text-blue-300">
          Please enter your registered student email and password to continue.
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-900 focus-within:border-blue-500">
              <HiOutlineMail className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="student@university.edu"
                className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-white placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-900 focus-within:border-blue-500">
              <HiLockClosed className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="********"
                className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-white placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md text-sm font-medium transition"
          >
            Login
          </button>

          {/* Register Link */}
          <div className="text-center text-sm mt-4">
            <span className="text-gray-600 dark:text-gray-400">
              New student?
            </span>{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Create Account
            </Link>
          </div>

        </form>

        {/* Footer */}
        <div className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400 leading-relaxed">
          This is a secure academic system. Unauthorized access is prohibited.
          <br />
          © {new Date().getFullYear()} Student Management System
        </div>

      </div>
    </div>
  );
};

export default Login;
