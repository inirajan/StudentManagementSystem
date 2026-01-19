import React, { useState, useEffect } from "react";
import api from "../api/axios";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

const ClassManager = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Form State
  const [formData, setFormData] = useState({
    grade: "",
    section: "",
    academicYear: "",
    classTeacher: "",
  });

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/class");
      setClasses(response.data.data);
    } catch (err) {
      console.error("Failed to fetch classes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // --- Actions ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a copy of data to modify
    const submitData = { ...formData };

    // SOLUTION: Handle the empty string for ObjectId validation
    if (!submitData.classTeacher || submitData.classTeacher.trim() === "") {
      submitData.classTeacher = null; // Setting to null prevents BSONError
    }

    try {
      if (editingClass) {
        await api.put(`/class/${editingClass._id}`, submitData);
        alert("Class updated successfully");
      } else {
        await api.post("/class", submitData);
        alert("Class created successfully");
      }
      resetForm();
      fetchClasses();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingClass(null);
    setFormData({ grade: "", section: "", academicYear: "", classTeacher: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await api.delete(`/class/${id}`);
        fetchClasses();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const startEdit = (cls) => {
    setEditingClass(cls);
    setFormData({
      grade: cls.grade,
      section: cls.section,
      academicYear: cls.academicYear,
      classTeacher: cls.classTeacher?._id || "",
    });
    setShowAddForm(true);
  };

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = classes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(classes.length / itemsPerPage);

  if (loading) return <div className="p-6 text-center">Loading Classes...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Class Management</h1>
          <p className="text-gray-500 text-sm">
            Manage grades, sections, and class teachers
          </p>
        </div>
        <button
          onClick={() => {
            if (showAddForm) resetForm();
            else setShowAddForm(true);
          }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white transition ${showAddForm ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {showAddForm ? (
            <>
              <FaTimes /> <span>Cancel</span>
            </>
          ) : (
            <>
              <FaPlus /> <span>Add Class</span>
            </>
          )}
        </button>
      </div>

      {/* ADD / EDIT FORM */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-bold mb-4 text-blue-600">
            {editingClass ? "Edit Class Info" : "Register New Class"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade
                </label>
                <input
                  placeholder="e.g. 9"
                  required
                  className="w-full border p-2 rounded"
                  value={formData.grade}
                  onChange={(e) =>
                    setFormData({ ...formData, grade: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <input
                  placeholder="e.g. A"
                  required
                  className="w-full border p-2 rounded uppercase"
                  value={formData.section}
                  onChange={(e) =>
                    setFormData({ ...formData, section: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Academic Year
                </label>
                <input
                  placeholder="e.g. 2026"
                  required
                  className="w-full border p-2 rounded"
                  value={formData.academicYear}
                  onChange={(e) =>
                    setFormData({ ...formData, academicYear: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher User ID (Optional)
                </label>
                <input
                  placeholder="Teacher User ID"
                  className="w-full border p-2 rounded"
                  value={formData.classTeacher}
                  onChange={(e) =>
                    setFormData({ ...formData, classTeacher: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white rounded font-bold py-2 hover:bg-blue-900 transition"
            >
              {editingClass ? "Update Class" : "Save Class"}
            </button>
          </form>
        </div>
      )}

      {/* TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-500 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Grade & Section</th>
              <th className="px-6 py-4">Academic Year</th>
              <th className="px-6 py-4">Class Teacher</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentItems.map((cls) => (
              <tr key={cls._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <span className="font-bold text-gray-900">
                    Grade {cls.grade}
                  </span>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-[10px] font-bold uppercase">
                    Section {cls.section}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {cls.academicYear}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {cls.classTeacher?.name || "Not Assigned"}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${cls.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {cls.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-4">
                  <button
                    onClick={() => startEdit(cls)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(cls._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="bg-white px-6 py-4 border-t flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, classes.length)} of {classes.length}{" "}
            entries
          </div>
          <div className="flex space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassManager;
