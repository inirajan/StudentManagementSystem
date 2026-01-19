"use client";
import { useState } from "react";
import API from "@/libs/api";
import Cookies from "js-cookie";

export default function EditUserModal({ user, type, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  // Pre-fill form with existing data
  const [formData, setFormData] = useState({
    name: user.user?.name || "",
    phone: user.user?.phone || "",
    // Student fields
    rollNumber: user.rollNumber || "",
    classRoom: user.classRoom || "",
    // Teacher fields
    subjectSpecialization: user.subjectSpecialization || "",
    salary: user.salary || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = Cookies.get("authToken");

    try {
      // Determine the endpoint based on type
      const endpoint =
        type === "STUDENT" ? `/student/${user._id}` : `/teacher/${user._id}`;

      // Send the update request
      await API.put(endpoint, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(`${type} updated successfully!`);
      onSuccess();
    } catch (error) {
      alert(
        "Update Failed: " + (error.response?.data?.message || "Server Error"),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          Edit {type} Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">
              Name
            </label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border p-3 rounded-xl bg-gray-50 focus:bg-white transition"
            />
          </div>

          {type === "STUDENT" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Roll Number
                  </label>
                  <input
                    type="number"
                    value={formData.rollNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, rollNumber: e.target.value })
                    }
                    className="w-full border p-3 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Class
                  </label>
                  <input
                    value={formData.classRoom}
                    onChange={(e) =>
                      setFormData({ ...formData, classRoom: e.target.value })
                    }
                    className="w-full border p-3 rounded-xl"
                  />
                </div>
              </div>
            </>
          )}

          {type === "TEACHER" && (
            <>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Subject
                </label>
                <input
                  value={formData.subjectSpecialization}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subjectSpecialization: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-xl"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Salary
                </label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  className="w-full border p-3 rounded-xl"
                />
              </div>
            </>
          )}

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Update Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
