"use client";
import { useState, useEffect, useCallback } from "react";
import API from "@/lib/api";
import { Trash2 } from "lucide-react";

export default function TeacherAssignments({ classId }) {
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    dueDate: "",
  });

  const fetchAssignments = useCallback(async () => {
    try {
      const res = await API.get(`/assignment/class/${classId}`);
      setAssignments(res.data.data || []);
    } catch (e) {}
  }, [classId]);

  useEffect(() => {
    if (classId) {
      (async () => {
        await fetchAssignments();
      })();
    }
  }, [classId, fetchAssignments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/assignment", { ...formData, class: classId });
      fetchAssignments();
      setFormData({ title: "", description: "", subject: "", dueDate: "" });
    } catch (e) {
      alert("Error");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete?")) {
      await API.delete(`/assignment/${id}`);
      fetchAssignments();
    }
  };

  if (!classId) return <p>You must be assigned to a class.</p>;

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="font-bold mb-4">Post Assignment</h3>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input
            placeholder="Title"
            required
            className="border p-2 rounded"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <input
            placeholder="Subject"
            required
            className="border p-2 rounded"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
          <input
            type="date"
            required
            className="border p-2 rounded"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
          />
          <input
            placeholder="Description"
            className="border p-2 rounded md:col-span-2"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <button className="bg-indigo-600 text-white p-2 rounded md:col-span-2">
            Post
          </button>
        </form>
      </div>
      <div className="space-y-4">
        {assignments.map((asg) => (
          <div
            key={asg._id}
            className="bg-white p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold">{asg.title}</h4>
              <p className="text-sm text-gray-500">{asg.subject}</p>
            </div>
            <button
              onClick={() => handleDelete(asg._id)}
              className="text-red-500"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
