"use client";
import { useEffect, useState } from "react";
import API from "@/libs/api";

export default function StudentReportCard({ studentId }) {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    if (studentId)
      API.get(`/report-card/student/${studentId}`).then((res) =>
        setReports(res.data.data),
      );
  }, [studentId]);

  if (!reports.length)
    return <p className="text-gray-500">No report cards available.</p>;

  return (
    <div className="space-y-6">
      {reports.map((report) => (
        <div
          key={report._id}
          className="border rounded-lg overflow-hidden shadow-sm bg-white"
        >
          <div className="bg-gray-50 p-4 font-bold flex justify-between">
            <span>{report.examType}</span>
            <span
              className={
                report.status === "Pass" ? "text-green-600" : "text-red-600"
              }
            >
              {report.status} ({report.overallGrade})
            </span>
          </div>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Subject</th>
                <th className="p-3">Marks</th>
                <th className="p-3">Grade</th>
              </tr>
            </thead>
            <tbody>
              {report.subjects.map((sub, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3">{sub.subjectName}</td>
                  <td className="p-3">
                    {sub.marksObtained}/{sub.totalMarks}
                  </td>
                  <td className="p-3 font-bold">{sub.subjectGrade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
