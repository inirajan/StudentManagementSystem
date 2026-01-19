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

const Teacher = () => {
  const [teachers, setTeachers] = useState([]); // Staff profiles
  const [users, setUsers] = useState([]); // Potential teachers from User model
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [newTeacher, setNewTeacher] = useState({
    user: "", // Selected User ID
    qualification: "",
    classTeacherOf: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [userRes, teacherRes] = await Promise.all([
        api.get("/user"),
        api.get("/teacher"),
      ]);
      // Filter users to only show those with TEACHER role for selection
      setUsers(userRes.data.data.filter((u) => u.role.includes("TEACHER")));
      setTeachers(teacherRes.data.data);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    const submitData = { ...newTeacher };

    // FIX for BSONError: Convert empty string to null so backend validation doesn't fail
    if (!submitData.classTeacherOf || submitData.classTeacherOf.trim() === "") {
      submitData.classTeacherOf = null;
    }

    try {
      await api.post("/teacher", submitData);
      alert("Teacher Profile Created Successfully");
      setShowAddForm(false);
      setNewTeacher({ user: "", qualification: "", classTeacherOf: "" });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create teacher profile");
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teachers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(teachers.length / itemsPerPage);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Teacher Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage academic staff and qualifications
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
              <FaPlus /> <span>Add Teacher</span>
            </>
          )}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 animate-fadeIn">
          <h2 className="text-lg font-bold mb-4 text-blue-600">
            Create Teacher Profile
          </h2>
          <form
            onSubmit={handleAddTeacher}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Teacher Name
              </label>
              <select
                required
                className="w-full border p-2 rounded bg-white"
                value={newTeacher.user}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, user: e.target.value })
                }
              >
                <option value="">Choose User...</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qualification
              </label>
              <input
                placeholder="e.g. M.Ed in English"
                className="w-full border p-2 rounded"
                value={newTeacher.qualification}
                onChange={(e) =>
                  setNewTeacher({
                    ...newTeacher,
                    qualification: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class Teacher Of ID (Optional)
              </label>
              <input
                placeholder="Class Object ID"
                className="w-full border p-2 rounded"
                value={newTeacher.classTeacherOf}
                onChange={(e) =>
                  setNewTeacher({
                    ...newTeacher,
                    classTeacherOf: e.target.value,
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="md:col-span-3 bg-blue-800 text-white rounded font-bold py-2 hover:bg-blue-900 transition"
            >
              Save Teacher Profile
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-500 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Gender</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentItems.map((teacher) => (
              <tr key={teacher._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-bold text-gray-900">
                  {teacher.user?.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {teacher.user?.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {teacher.user?.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {teacher.user?.gender}
                </td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bg-white px-6 py-4 border-t flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, teachers.length)} of {teachers.length}{" "}
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

// CRITICAL: This is what was missing to fix the SyntaxError
export default Teacher;
