import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { HiLockClosed } from "react-icons/hi2";
import { loginRequest } from "../api/auth.api";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Send login request to backend
      const res = await loginRequest({ email, password });

      /** * CRITICAL FIX:
       * Your controller sends: { data: {userObj}, token: "...", message: "..." }
       * Axios wraps this in its own 'data' property.
       * So res.data.data is your user object.
       */
      const userData = res.data.data;
      const token = res.data.token;

      if (userData && token) {
        // 2. Save to AuthContext and LocalStorage
        login(userData, token);

        // 3. Role-based redirection
        const userRole = Array.isArray(userData.role)
          ? userData.role[0]
          : userData.role;

        if (userRole === "ADMIN") {
          navigate("/dashboard");
        } else if (userRole === "TEACHER") {
          // Fixes the blank redirect issue
          navigate("/teacher-dashboard");
        } else if (userRole === "STUDENT") {
          navigate("/student-dashboard");
        }
      }
    } catch (err) {
      // Improved error reporting from backend
      const errorMessage =
        err.response?.data?.message || err.response?.data || "Login failed";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Student Management System
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Secure Academic & Administration Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1 ml-1">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <HiOutlineMail className="text-gray-400 mr-2 text-lg" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1 ml-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2.5 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <HiLockClosed className="text-gray-400 mr-2 text-lg" />
              <input
                type="password"
                placeholder="********"
                className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Dynamic Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/30 transition-all ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Verifying..." : "Login"}
          </button>

          {/* Registration Link */}
          <div className="text-center text-sm mt-6">
            <span className="text-gray-600 dark:text-gray-400">New User?</span>{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
            >
              Create Account
            </Link>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-[10px] text-center text-gray-400 uppercase tracking-widest">
          © {new Date().getFullYear()} Student Management System
        </div>
      </div>
    </div>
  );
};

export default Login;
