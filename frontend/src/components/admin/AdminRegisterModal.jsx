"use client";
import { useState, useEffect } from "react";
import API from "@/libs/api";
import Cookies from "js-cookie";
import {
  X,
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Building,
} from "lucide-react";

export default function AdminRegisterModal({ onClose, onSuccess }) {
  const [role, setRole] = useState("STUDENT");
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]); // Store list of classes here

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    rollNumber: "",
    classRoom: "", // This will store the selected ObjectId
    parentName: "",
    parentContact: "",
    qualification: "",
    assignedClassId: "",
    assignedSubject: "",
  });

  // 1. FETCH CLASSES ON LOAD so we can show names but send IDs
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = Cookies.get("authToken");
        const { data } = await API.get("/class", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Handle different response structures
        setClasses(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Failed to load classes", err);
      }
    };
    fetchClasses();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = Cookies.get("authToken");
    const fullAddress = `${formData.street}, ${formData.city}, ${formData.province}`;

    try {
      // 1. Create User
      const userResponse = await API.post(
        "/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: fullAddress,
          role: [role],
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const newUserId = userResponse.data.data._id;

      // 2. Create Profile
      if (role === "STUDENT") {
        await API.post(
          "/student",
          {
            user: newUserId,
            studentId: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
            rollNumber: Number(formData.rollNumber),

            classRoom: formData.classRoom, // Sends the ObjectId selected from dropdown

            parentName: formData.parentName,
            parentContact: formData.parentContact,
            address: fullAddress,
            attendanceRate: 100,
            totalAbasences: 0,
            currentGPA: 0,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } else if (role === "TEACHER") {
        const assignments = [];
        if (formData.assignedClassId && formData.assignedSubject) {
          assignments.push({
            class: formData.assignedClassId, // Sends ObjectId
            Subject: formData.assignedSubject,
          });
        }

        await API.post(
          "/teacher",
          {
            user: newUserId,
            qualification: formData.qualification
              .split(",")
              .map((q) => q.trim()),
            assignedClasses: assignments,
            classTeacherOf: null,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }

      alert(`${role} Registered Successfully!`);
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(
        "Registration Failed: " +
          (error.response?.data?.message || "Check your inputs."),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-3xl">
          <h2 className="text-xl font-black text-slate-800">
            New Registration
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 font-bold px-2 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setRole("STUDENT")}
              className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${role === "STUDENT" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("TEACHER")}
              className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${role === "TEACHER" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Teacher
            </button>
          </div>

          <form id="regForm" onSubmit={handleSubmit} className="space-y-6">
            {/* Account Credentials */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-400 uppercase">
                Account Credentials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 ml-1">
                    Full Name
                  </label>
                  <input
                    name="name"
                    required
                    className="input-field"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 ml-1">
                    Phone
                  </label>
                  <input
                    name="phone"
                    required
                    className="input-field"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 ml-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="input-field"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 ml-1">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="input-field"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Address Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-400 uppercase">
                Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-600 ml-1">
                    Street
                  </label>
                  <input
                    name="street"
                    required
                    className="input-field"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 ml-1">
                    City
                  </label>
                  <input
                    name="city"
                    required
                    className="input-field"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 ml-1">
                    Province
                  </label>
                  <input
                    name="province"
                    required
                    className="input-field"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Profile Details */}
            <div
              className={`space-y-4 p-5 rounded-2xl ${role === "STUDENT" ? "bg-indigo-50/50" : "bg-emerald-50/50"}`}
            >
              <h3
                className={`text-xs font-black uppercase ${role === "STUDENT" ? "text-indigo-500" : "text-emerald-600"}`}
              >
                {role} Profile
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {role === "STUDENT" && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 ml-1">
                        Roll No
                      </label>
                      <input
                        name="rollNumber"
                        type="number"
                        required
                        className="input-field"
                        onChange={handleChange}
                      />
                    </div>

                    {/* --- THE FIX: DROPDOWN FOR CLASSES --- */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 ml-1">
                        Select Class
                      </label>
                      <select
                        name="classRoom"
                        required
                        className="input-field"
                        onChange={handleChange}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Choose a Class...
                        </option>
                        {classes.map((cls) => (
                          <option key={cls._id} value={cls._id}>
                            {cls.className}{" "}
                            {cls.section ? `(${cls.section})` : ""}
                          </option>
                        ))}
                      </select>
                      <p className="text-[10px] text-gray-500 ml-1">
                        Select name, system sends ID.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 ml-1">
                        Parent
                      </label>
                      <input
                        name="parentName"
                        required
                        className="input-field"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 ml-1">
                        Contact
                      </label>
                      <input
                        name="parentContact"
                        required
                        className="input-field"
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                {role === "TEACHER" && (
                  <>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-gray-600 ml-1">
                        Qualifications
                      </label>
                      <input
                        name="qualification"
                        required
                        placeholder="Degrees..."
                        className="input-field"
                        onChange={handleChange}
                      />
                    </div>

                    {/* Optional Class Assignment Dropdown */}
                    <div className="md:col-span-2 mt-2 pt-2 border-t border-emerald-200">
                      <h4 className="text-xs font-black text-emerald-600 uppercase mb-3">
                        Assign First Class (Optional)
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-600 ml-1">
                            Select Class
                          </label>
                          <select
                            name="assignedClassId"
                            className="input-field"
                            onChange={handleChange}
                            defaultValue=""
                          >
                            <option value="">No Assignment</option>
                            {classes.map((cls) => (
                              <option key={cls._id} value={cls._id}>
                                {cls.className}{" "}
                                {cls.section ? `(${cls.section})` : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-600 ml-1">
                            Subject
                          </label>
                          <input
                            name="assignedSubject"
                            placeholder="Math"
                            className="input-field"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50 rounded-b-3xl flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-gray-600 font-bold bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="regForm"
            disabled={loading}
            className={`flex-1 py-3 text-white font-bold rounded-xl ${role === "STUDENT" ? "bg-indigo-600" : "bg-emerald-600"} ${loading ? "opacity-50" : ""}`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>
      </div>
      <style jsx>{`
        .input-field {
          width: 100%;
          border: 1px solid #e5e7eb;
          background-color: #f9fafb;
          padding: 0.75rem;
          border-radius: 0.75rem;
          outline: none;
        }
        .input-field:focus {
          background-color: #ffffff;
          border-color: #6366f1;
        }
      `}</style>
    </div>
  );
}
