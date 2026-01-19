import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext"; // Ensure this import matches your project structure
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaSave,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const ReportCardPage = () => {
  const { user } = useAuth(); // Get user from context to check role
  const [reports, setReports] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Safely determine if user is a student
  const isStudent = user?.role === "STUDENT" || user?.role?.includes("STUDENT");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Form State
  const [formData, setFormData] = useState({
    student: "",
    classLevel: "",
    section: "",
    examType: "Final Term",
    subjects: [{ subjectName: "", marksObtained: 0, totalMarks: 100 }],
    teacherRemarks: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reportRes, studentRes] = await Promise.all([
        api.get("/report-card"),
        api.get("/student"),
      ]);
      setReports(reportRes.data.data);
      setStudents(studentRes.data.data);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Dynamic Subject Handlers ---
  const addSubjectField = () => {
    setFormData({
      ...formData,
      subjects: [
        ...formData.subjects,
        { subjectName: "", marksObtained: 0, totalMarks: 100 },
      ],
    });
  };

  const removeSubjectField = (index) => {
    const newSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index][field] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  // --- Actions ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/report-card/${editingId}`, formData);
        alert("Report card updated successfully!");
      } else {
        await api.post("/report-card", formData);
        alert("Report card created successfully!");
      }
      resetForm();
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Validation failed.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report card?")) {
      try {
        await api.delete(`/report-card/${id}`);
        fetchData();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const startEdit = (report) => {
    setEditingId(report._id);
    setFormData({
      student: report.student?._id || "",
      classLevel: report.classLevel || "",
      section: report.section || "",
      examType: report.examType || "Final Term",
      subjects: report.subjects || [],
      teacherRemarks: report.teacherRemarks || "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      student: "",
      classLevel: "",
      section: "",
      examType: "Final Term",
      subjects: [{ subjectName: "", marksObtained: 0, totalMarks: 100 }],
      teacherRemarks: "",
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reports.length / itemsPerPage);

  if (loading)
    return <div className="p-10 text-center">Loading Academic Reports...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Academic Reports</h1>
          <p className="text-gray-500 text-sm">
            {isStudent
              ? "View your academic performance results"
              : "Manage student grades and term results"}
          </p>
        </div>

        {/* Only Admin/Teacher can see the New Report button */}
        {!isStudent && (
          <button
            onClick={() => (showForm ? resetForm() : setShowForm(true))}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white transition ${showForm ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {showForm ? (
              <>
                {" "}
                <FaTimes /> <span>Cancel</span>{" "}
              </>
            ) : (
              <>
                {" "}
                <FaPlus /> <span>New Report</span>{" "}
              </>
            )}
          </button>
        )}
      </div>

      {/* Form View (Only for Admin/Teacher) */}
      {!isStudent && showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8 animate-fadeIn">
          <h2 className="text-lg font-bold mb-4 text-blue-600">
            {editingId ? "Edit Report" : "Create New Report Card"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student
                </label>
                <select
                  required
                  className="w-full border p-2 rounded bg-white"
                  value={formData.student}
                  onChange={(e) =>
                    setFormData({ ...formData, student: e.target.value })
                  }
                >
                  <option value="">Select Student...</option>
                  {students.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.user?.name} ({s.studentId})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade/Level
                </label>
                <input
                  placeholder="e.g. 10"
                  required
                  className="w-full border p-2 rounded"
                  value={formData.classLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, classLevel: e.target.value })
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
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exam Type
              </label>
              <select
                className="w-full border p-2 rounded bg-white"
                value={formData.examType}
                onChange={(e) =>
                  setFormData({ ...formData, examType: e.target.value })
                }
              >
                <option value="First Term">First Term</option>
                <option value="Mid Term">Mid Term</option>
                <option value="Final Term">Final Term</option>
              </select>
            </div>

            <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-bold text-gray-600 uppercase">
                Subject Marks
              </h3>
              {formData.subjects.map((sub, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center animate-fadeIn"
                >
                  <input
                    placeholder="Subject"
                    required
                    className="border p-2 rounded flex-1"
                    value={sub.subjectName}
                    onChange={(e) =>
                      handleSubjectChange(index, "subjectName", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Marks"
                    required
                    className="border p-2 rounded w-28"
                    value={sub.marksObtained}
                    onChange={(e) =>
                      handleSubjectChange(
                        index,
                        "marksObtained",
                        Number(e.target.value),
                      )
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeSubjectField(index)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSubjectField}
                className="text-blue-600 text-sm font-bold flex items-center hover:underline"
              >
                <FaPlus className="mr-1" size={10} /> Add Subject
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teacher Remarks
              </label>
              <textarea
                placeholder="Write student performance remarks here..."
                required
                className="w-full border p-2 rounded h-24"
                value={formData.teacherRemarks}
                onChange={(e) =>
                  setFormData({ ...formData, teacherRemarks: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition flex items-center justify-center"
            >
              <FaSave className="mr-2" />{" "}
              {editingId ? "Update Report Card" : "Save Report Card"}
            </button>
          </form>
        </div>
      )}

      {/* TABLE VIEW */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Level & Section</th>
              <th className="px-6 py-4">Exam Type</th>
              <th className="px-6 py-4 text-center">GPA / Status</th>
              {/* Only Admin/Teacher see the Actions header */}
              {!isStudent && <th className="px-6 py-4 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentItems.length === 0 ? (
              <tr>
                <td
                  colSpan={isStudent ? "4" : "5"}
                  className="px-6 py-10 text-center text-gray-400"
                >
                  No report cards published yet.
                </td>
              </tr>
            ) : (
              currentItems.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">
                      {r.student?.user?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {r.student?.studentId}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    Grade {r.classLevel} - {r.section}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">
                    {r.examType}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-blue-600 font-black mr-2">
                      {r.overallGrade}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${r.status === "Pass" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  {/* Only Admin/Teacher see the Action buttons */}
                  {!isStudent && (
                    <td className="px-6 py-4 text-center space-x-4">
                      <button
                        onClick={() => startEdit(r)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="bg-white px-6 py-4 border-t flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Showing {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, reports.length)} of {reports.length}{" "}
            reports
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

export default ReportCardPage;
