"use client";
import { useState } from "react";
import API from "@/libs/api";

export default function CreateClassModal({ teachers, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    classTeacher: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/class", {
        ...formData,
        classTeacher: formData.classTeacher || null,
      });
      alert("Class Created!");
      onSuccess();
    } catch (error) {
      alert("Error creating class");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Create Class</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Class Name"
            required
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setFormData({ ...formData, className: e.target.value })
            }
          />
          <input
            placeholder="Section"
            required
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setFormData({ ...formData, section: e.target.value })
            }
          />
          <select
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setFormData({ ...formData, classTeacher: e.target.value })
            }
          >
            <option value="">Select Teacher (Optional)</option>
            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.user.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="text-gray-500">
              Cancel
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
