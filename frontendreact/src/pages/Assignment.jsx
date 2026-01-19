import React, { useState, useRef, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";
import {
  FaCloudUploadAlt,
  FaFileAlt,
  FaCheckCircle,
  FaSpinner,
  FaPlus,
  FaTrash,
  FaEdit,
  FaTimes,
  FaClipboardList,
} from "react-icons/fa";

const Assignments = () => {
  const { user } = useAuth(); //
  const fileInputRef = useRef(null);

  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]); // State for grade selection
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Added 'grade' to formData state to match backend requirements
  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    points: 100,
    description: "",
    grade: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const isStudent = user?.role === "STUDENT" || user?.role?.includes("STUDENT");
  const isTeacher =
    user?.role === "TEACHER" ||
    user?.role === "ADMIN" ||
    user?.role?.includes("TEACHER");

  useEffect(() => {
    fetchAssignments();
    if (isTeacher) fetchGrades(); // Populate the dropdown for teachers
  }, [isTeacher]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/assignments");
      setAssignments(res.data.data || []);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGrades = async () => {
    try {
      // Calls your backend class/grade service
      const res = await api.get("/classes");
      setGrades(res.data.data || []);
    } catch (err) {
      console.error("Error fetching grades", err);
    }
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();

    // Logic: Include teacher ID and selected grade to avoid Server Error
    try {
      const payload = {
        ...formData,
        teacher: user?._id, // Required for backend association
      };

      if (editingId) {
        await api.put(`/assignments/${editingId}`, payload);
      } else {
        await api.post("/assignments", payload);
      }

      setShowForm(false);
      setEditingId(null);
      resetFormData();
      fetchAssignments();
      alert("Assignment published!");
    } catch (err) {
      // Improved feedback to diagnose server-side rejection
      console.error("Payload Error:", err.response?.data);
      alert(
        "Action failed: " + (err.response?.data?.message || "Server error"),
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this assignment?")) {
      try {
        await api.delete(`/assignments/${id}`);
        fetchAssignments();
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  const resetFormData = () => {
    setFormData({
      title: "",
      dueDate: "",
      points: 100,
      description: "",
      grade: "",
    });
  };

  const handleFileSelectTrigger = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleUpload = async (assignmentId) => {
    if (!selectedFile) return alert("Please select a file first.");
    const form = new FormData();
    form.append("assignmentFile", selectedFile);
    form.append("studentId", user?._id);
    form.append("assignmentId", assignmentId || "general_submission");

    try {
      setUploading(true);
      await api.post("/assignments/submit", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Assignment submitted successfully!");
      setSelectedFile(null);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading Assignments...</div>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.docx,.doc"
      />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Assignments</h1>
          <p className="text-gray-500 mt-1">
            {isStudent
              ? "Manage and submit your coursework"
              : "Create and manage student tasks"}
          </p>
        </div>

        {isTeacher && (
          <button
            onClick={() => {
              if (showForm) resetFormData();
              setShowForm(!showForm);
              setEditingId(null);
            }}
            className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition shadow-lg ${
              showForm ? "bg-gray-600 text-white" : "bg-blue-600 text-white"
            }`}
          >
            {showForm ? (
              <>
                <FaTimes /> Cancel
              </>
            ) : (
              <>
                <FaPlus /> Give Assignment
              </>
            )}
          </button>
        )}
      </div>

      {isTeacher && showForm && (
        <form
          onSubmit={handleTeacherSubmit}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-fadeIn"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            {editingId ? "Edit Assignment" : "New Assignment"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              className="border p-3 rounded-xl outline-none"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <input
              type="date"
              className="border p-3 rounded-xl outline-none"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              required
            />

            {/* Logic: Select Grade dropdown to populate mandatory field */}
            <select
              className="border p-3 rounded-xl outline-none bg-white"
              value={formData.grade}
              onChange={(e) =>
                setFormData({ ...formData, grade: e.target.value })
              }
              required
            >
              <option value="">Select Grade</option>
              {grades.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.grade} - {g.section}
                </option>
              ))}
            </select>
          </div>
          <textarea
            className="w-full border p-3 rounded-xl h-24 mb-4 outline-none"
            placeholder="Instructions..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <button className="w-full bg-blue-800 text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition">
            {editingId ? "Update Assignment" : "Publish Assignment"}
          </button>
        </form>
      )}

      <div className="space-y-6">
        {assignments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <FaClipboardList className="mx-auto text-5xl text-gray-300 mb-4" />
            <p className="text-gray-400 font-medium">No assignments found.</p>
          </div>
        ) : (
          assignments.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-4 rounded-xl text-blue-600 text-2xl">
                    <FaFileAlt />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-400">
                      Due: {new Date(item.dueDate).toLocaleDateString()} •{" "}
                      {item.points} Points
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {isStudent ? (
                    <button
                      onClick={
                        selectedFile
                          ? () => handleUpload(item._id)
                          : handleFileSelectTrigger
                      }
                      className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2"
                    >
                      {uploading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaCloudUploadAlt />
                      )}
                      {selectedFile ? "Confirm Upload" : "Submit Work"}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(item._id);
                          setFormData({
                            ...item,
                            dueDate: item.dueDate.split("T")[0],
                          });
                          setShowForm(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </div>
              {isStudent && (
                <UploadBox
                  selectedFile={selectedFile}
                  handleFileSelectTrigger={handleFileSelectTrigger}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const UploadBox = ({ selectedFile, handleFileSelectTrigger }) => (
  <div
    onClick={handleFileSelectTrigger}
    className={`p-12 border-2 border-dashed rounded-3xl text-center cursor-pointer transition-all ${selectedFile ? "border-green-400 bg-green-50" : "border-blue-200 bg-blue-50/30 hover:bg-blue-50"}`}
  >
    {selectedFile ? (
      <>
        <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800">{selectedFile.name}</h2>
        <p className="text-gray-500 mt-1">
          Ready to submit. Click the blue button to confirm.
        </p>
      </>
    ) : (
      <>
        <FaCloudUploadAlt className="text-5xl text-blue-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800">Quick Upload</h2>
        <p className="text-gray-500 mb-6">
          Drag and drop your assignment files here (PDF, DOCX)
        </p>
        <button className="bg-white text-blue-600 border border-blue-200 px-8 py-3 rounded-2xl font-bold shadow-sm">
          Select Files
        </button>
      </>
    )}
  </div>
);

export default Assignments;
