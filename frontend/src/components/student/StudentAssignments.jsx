"use client";
import { useEffect, useState } from "react";
import API from "@/libs/api";

export default function StudentAssignments({ classId }) {
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    if (classId)
      API.get(`/assignment/class/${classId}`).then((res) =>
        setAssignments(res.data.data),
      );
  }, [classId]);

  if (!assignments.length)
    return <p className="text-gray-500">No pending assignments.</p>;

  return (
    <div className="grid gap-4">
      {assignments.map((asg) => (
        <div
          key={asg._id}
          className="bg-white border p-4 rounded hover:shadow-md transition"
        >
          <h3 className="font-bold text-lg">{asg.title}</h3>
          <p className="text-sm text-indigo-600">
            {asg.subject} - Due: {new Date(asg.dueDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
