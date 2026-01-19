import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Updated to Port 5000
  withCredentials: true,
});

// Interceptor to attach token manually if needed
API.interceptors.request.use((req) => {
  const token = Cookies.get("authToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
