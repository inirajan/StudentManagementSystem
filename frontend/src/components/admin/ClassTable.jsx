export default function ClassTable({ classes, onDelete }) {
  if (!classes.length)
    return <p className="text-center p-6 text-gray-500">No classes found.</p>;
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
          <tr>
            <th className="p-4">Class</th>
            <th className="p-4">Section</th>
            <th className="p-4">Teacher</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {classes.map((cls) => (
            <tr key={cls._id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-bold text-indigo-600">{cls.grade}</td>
              <td className="p-4">{cls.section}</td>
              <td className="p-4">
                {cls.classTeacher?.user?.name || "Not Assigned"}
              </td>
              <td className="p-4 text-right">
                <button
                  onClick={() => onDelete(cls._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
