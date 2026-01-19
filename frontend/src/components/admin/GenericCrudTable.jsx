"use client";
import { Trash2, Edit } from "lucide-react";

export default function GenericCrudTable({ data, type, onDelete, onEdit }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-gray-500 font-medium">
          No {type.toLowerCase()}s found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
          <tr>
            <th className="p-5">Name</th>
            <th className="p-5">Email</th>
            <th className="p-5">Role Info</th>
            <th className="p-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm divide-y divide-gray-100">
          {data.map((item) => (
            <tr
              key={item._id}
              className="hover:bg-indigo-50/30 transition duration-150"
            >
              <td className="p-5 font-bold text-slate-800">
                {item.user?.name || item.name || "N/A"}
              </td>
              <td className="p-5 text-slate-500">
                {item.user?.email || item.email || "N/A"}
              </td>
              <td className="p-5 text-indigo-600 font-medium">
                {/* Show specific info based on type */}
                {type === "STUDENT" &&
                  `Roll: ${item.rollNumber} | Class: ${item.classRoom}`}
                {type === "TEACHER" && `Subject: ${item.subjectSpecialization}`}
              </td>
              <td className="p-5">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                    title="Edit User"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
                    className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition"
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
