import React, { useState, useEffect } from "react";
import api from "../api/axios";  // Import the Axios instance

const StudentManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/user");  // Correct endpoint
        const filteredUsers = response.data.data.filter((user) => 
          user.role.includes("STUDENT") // Only include users with the "STUDENT" role
        );
        setUsers(filteredUsers);  // Set the filtered users
      } catch (err) {
        setError("Failed to fetch users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures it runs once after the initial render

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-table-container">
      <h1>Student Management</h1>

      {users.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Country</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role.join(", ")}</td>
                <td>{user.address?.country || "N/A"}</td>
                <td>{user.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentManager;
