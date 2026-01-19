import API from "./api";
import Cookies from "js-cookie";

export const handleLogin = async (identifier, password, router) => {
  try {
    const res = await API.post("/auth/login", {
      email: identifier,
      phone: identifier,
      password,
    });

    const userData = res.data.data;
    const token = res.data.token;

    if (!userData || !token) {
      alert("Error: Server response missing user or token");
      return;
    }

    // Save data
    Cookies.set("authToken", token, { expires: 1 });
    localStorage.setItem("user", JSON.stringify(userData));

    // Role-based redirection
    const role = Array.isArray(userData.role)
      ? userData.role[0]
      : userData.role;
    if (role === "ADMIN") router.push("/dashboard/admin");
    else if (role === "TEACHER") router.push("/dashboard/teacher");
    else if (role === "STUDENT") router.push("/dashboard/student");
  } catch (error) {
    const message = error.response?.data?.message || "Login Failed";
    alert("Login Error: " + message);
  }
};

/**
 * Handles User Registration
 */
export const handleRegister = async (formData, router) => {
  try {
    // Backend expects role as an array ["STUDENT"]
    const payload = { ...formData, role: [formData.role] };
    await API.post("/auth/register", payload);

    alert("Registration Successful! Please Login.");
    router.push("/login");
  } catch (error) {
    const message = error.response?.data?.message || "Registration Failed";
    alert("Registration Error: " + message);
  }
};
