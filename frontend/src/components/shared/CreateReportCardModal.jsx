"use client";
import { useState, useEffect } from "react";
import API from "@/lib/api";

export default function CreateReportCardModal({ onClose, onSuccess }) {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    student: "",
    examType: "Final Term",
    classLevel: "10",
    section: "A",
    teacherRemarks: "",
    subjects: [{ subjectName: "", marksObtained: 0, totalMarks: 100 }],
  });

  useEffect(() => {
    API.get("/student")
      .then((res) => setStudents(res.data.data || res.data))
      .catch(console.error);
  }, []);

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index][field] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/report-card", formData);
      alert("Success!");
      onSuccess();
    } catch (e) {
      alert("Error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Create Report Card</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            required
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setFormData({ ...formData, student: e.target.value })
            }
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.user.name}
              </option>
            ))}
          </select>
          {formData.subjects.map((sub, index) => (
            <div key={index} className="flex gap-2">
              <input
                placeholder="Subject"
                className="border p-2 rounded w-1/2"
                onChange={(e) =>
                  handleSubjectChange(index, "subjectName", e.target.value)
                }
              />
              <input
                placeholder="Marks"
                type="number"
                className="border p-2 rounded w-1/4"
                onChange={(e) =>
                  handleSubjectChange(index, "marksObtained", e.target.value)
                }
              />
              <input
                placeholder="Total"
                type="number"
                className="border p-2 rounded w-1/4"
                onChange={(e) =>
                  handleSubjectChange(index, "totalMarks", e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                subjects: [
                  ...formData.subjects,
                  { subjectName: "", marksObtained: 0, totalMarks: 100 },
                ],
              })
            }
            className="text-indigo-600 text-sm"
          >
            + Add Subject
          </button>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="text-gray-500">
              Cancel
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
