import React, { useState, useEffect } from "react";
import api from "../api/axios";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]); // Store available classes
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Form State for Adding
  const [newStudent, setNewStudent] = useState({
    user: "",
    studentId: "",
    classRoom: "", // Added classRoom reference
    currentGPA: "",
    attendanceRate: "",
    totalAbasences: "0",
    parentName: "",
    parentContact: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch students and classes in parallel
      const [studentRes, classRes] = await Promise.all([
        api.get("/student"),
        api.get("/class"),
      ]);
      setStudents(studentRes.data.data);
      setClasses(classRes.data.data);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- ACTIONS ---
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await api.post("/student", newStudent);
      setShowAddForm(false);
      fetchData();
      setNewStudent({
        user: "",
        studentId: "",
        classRoom: "",
        currentGPA: "",
        attendanceRate: "",
        totalAbasences: "0",
        parentName: "",
        parentContact: "",
      });
    } catch (err) {
      alert(
        "Error: " +
          (err.response?.data?.message || "Verify User ID and uniqueness"),
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete student profile and associated user account?")) {
      try {
        await api.delete(`/student/${id}`);
        fetchData();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Student Management
          </h1>
          <p className="text-gray-500 text-sm">
            Assign students to classes and manage profiles.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaPlus /> <span>{showAddForm ? "Cancel" : "Add Student"}</span>
        </button>
      </div>

      {/* ADD STUDENT FORM */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-bold mb-4 text-blue-600">
            Register New Student
          </h2>
          <form
            onSubmit={handleAddStudent}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              placeholder="User Object ID"
              required
              className="border p-2 rounded"
              value={newStudent.user}
              onChange={(e) =>
                setNewStudent({ ...newStudent, user: e.target.value })
              }
            />
            <input
              placeholder="Student ID"
              required
              className="border p-2 rounded"
              value={newStudent.studentId}
              onChange={(e) =>
                setNewStudent({ ...newStudent, studentId: e.target.value })
              }
            />

            {/* Class Selection Dropdown */}
            <select
              required
              className="border p-2 rounded bg-white"
              value={newStudent.classRoom}
              onChange={(e) =>
                setNewStudent({ ...newStudent, classRoom: e.target.value })
              }
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  Grade {cls.grade} - {cls.section} ({cls.academicYear})
                </option>
              ))}
            </select>

            <input
              placeholder="Current GPA"
              className="border p-2 rounded"
              value={newStudent.currentGPA}
              onChange={(e) =>
                setNewStudent({ ...newStudent, currentGPA: e.target.value })
              }
            />
            <input
              placeholder="Attendance %"
              className="border p-2 rounded"
              value={newStudent.attendanceRate}
              onChange={(e) =>
                setNewStudent({ ...newStudent, attendanceRate: e.target.value })
              }
            />
            <input
              placeholder="Parent Name"
              className="border p-2 rounded"
              value={newStudent.parentName}
              onChange={(e) =>
                setNewStudent({ ...newStudent, parentName: e.target.value })
              }
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded font-bold py-2 md:col-span-3 hover:bg-blue-700 transition"
            >
              Save Student Profile
            </button>
          </form>
        </div>
      )}

      {/* STUDENT TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                Student Name
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                Class Info
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">
                Academic Details
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentItems.map((stu) => (
              <tr key={stu._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900">
                    {stu.user?.name}
                  </div>
                  <div className="text-xs text-gray-500">{stu.user?.email}</div>
                </td>
                <td className="px-6 py-4">
                  {stu.classRoom ? (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                      Grade {stu.classRoom.grade} - {stu.classRoom.section}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs italic">
                      Unassigned
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    ID: <span className="font-medium">{stu.studentId}</span>
                  </div>
                  <div className="text-xs font-bold text-indigo-600">
                    GPA: {stu.currentGPA} | Att: {stu.attendanceRate}
                  </div>
                </td>
                <td className="px-6 py-4 text-center space-x-4">
                  <button
                    onClick={() => setEditingStudent(stu)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(stu._id)}
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
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManager;
