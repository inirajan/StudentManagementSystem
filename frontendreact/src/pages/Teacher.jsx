import React, { useState, useEffect } from "react";
import api from "../api/axios";  // Adjust the path to your axios instance

const Teacher = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    gender: "MALE",
    address: {
      city: "",
      province: "",
    },
    role: ["TEACHER"],
  });

  // Fetch users from the backend and filter only teachers
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/user");
        const filteredUsers = response.data.data.filter((user) =>
          user.role.includes("TEACHER")
        );
        setUsers(filteredUsers);
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user", newTeacher);
      setUsers([response.data.data, ...users]); // Add new teacher at the top
      setNewTeacher({
        name: "",
        age: "",
        email: "",
        phone: "",
        gender: "MALE",
        address: {
          city: "",
          province: "",
        },
        role: ["TEACHER"],
      });
    } catch (error) {
      setError("Failed to add teacher");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/user/${id}`);
      setUsers(users.filter((user) => user._id !== id)); // Remove from state
    } catch (err) {
      setError("Failed to delete teacher");
      console.error(err);
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value.toLowerCase());

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery)
  );

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredUsers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      {/* Add Teacher Form */}
      <div className="bg-white p-6 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-4">Add New Teacher</h2>
        <form onSubmit={handleAddTeacher}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="text"
                value={newTeacher.age}
                onChange={(e) => setNewTeacher({ ...newTeacher, age: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={newTeacher.phone}
                onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={newTeacher.gender}
              onChange={(e) => setNewTeacher({ ...newTeacher, gender: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
          >
            Add Teacher
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Table for displaying teachers */}
      <table className="min-w-full table-auto border-collapse bg-white shadow rounded-md">
        <thead>
          <tr>
            <th className="p-4 text-left border-b">Name</th>
            <th className="p-4 text-left border-b">Email</th>
            <th className="p-4 text-left border-b">Phone</th>
            <th className="p-4 text-left border-b">Gender</th>
            <th className="p-4 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTeachers.map((user) => (
            <tr key={user._id}>
              <td className="p-4 border-b">{user.name}</td>
              <td className="p-4 border-b">{user.email}</td>
              <td className="p-4 border-b">{user.phone}</td>
              <td className="p-4 border-b">{user.gender}</td>
              <td className="p-4 border-b">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-l-md"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-r-md"
          disabled={currentPage === Math.ceil(filteredUsers.length / teachersPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Teacher;
