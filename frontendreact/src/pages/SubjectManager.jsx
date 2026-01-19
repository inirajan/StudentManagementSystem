import React, { useState, useEffect } from "react";
import api from "../api/axios";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const SubjectManager = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/subject");
      setSubjects(res.data.data);
    } catch (err) {
      console.error("Failed to fetch subjects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/subject", formData);
      alert("Subject created successfully!");
      setFormData({ name: "", code: "", description: "" });
      setShowAddForm(false);
      fetchSubjects();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating subject");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to deactivate this subject?")) {
      try {
        await api.delete(`/subject/${id}`);
        fetchSubjects();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(subjects.length / itemsPerPage);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">Loading Subjects...</div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Subject Management
          </h1>
          <p className="text-gray-500 text-sm">
            Define and organize academic courses.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white transition ${showAddForm ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {showAddForm ? (
            <>
              <FaTimes /> <span>Cancel</span>
            </>
          ) : (
            <>
              <FaPlus /> <span>Add Subject</span>
            </>
          )}
        </button>
      </div>

      {/* ADD SUBJECT FORM */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 animate-fadeIn">
          <h2 className="text-lg font-bold mb-4 text-blue-600">
            Register New Subject
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              placeholder="Subject Name (e.g. Mathematics)"
              required
              className="border p-2 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              placeholder="Subject Code (e.g. MATH101)"
              required
              className="border p-2 rounded uppercase"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
            />
            <input
              placeholder="Short Description"
              className="border p-2 rounded"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <button
              type="submit"
              className="md:col-span-3 bg-blue-800 text-white rounded font-bold py-2 hover:bg-blue-900 transition"
            >
              Save Subject
            </button>
          </form>
        </div>
      )}

      {/* SUBJECT TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-500 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Subject Name</th>
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentItems.map((sub) => (
              <tr key={sub._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-bold text-gray-900">
                  {sub.name}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-bold uppercase border border-orange-100">
                    {sub.code}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {sub.description || "No description provided."}
                </td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(sub._id)}
                    className="text-red-500 hover:text-red-700"
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
            {Math.min(indexOfLastItem, subjects.length)} of {subjects.length}{" "}
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
              disabled={currentPage === totalPages}
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

export default SubjectManager;
