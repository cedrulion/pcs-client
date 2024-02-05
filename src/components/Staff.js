import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Staff = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    phonenumber: '',
    email: '',
    password: '',
    role: '', // Add role field
  });
  const token = localStorage.getItem('Token');

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data.data.allUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (formData.role !== 'user') {
      fetchAllUsers();
    } else {
      setLoading(false);
    }
  }, [token, formData.role]);

  const handleCreate = async () => {
    try {
      // Show modal for data input
      setShowModal(true);
    } catch (error) {
      console.error('Error opening create staff modal:', error);
    }
  };

  const handleModalClose = () => {
    // Close the modal and reset form data
    setShowModal(false);
    setFormData({
      firstname: '',
      lastname: '',
      username: '',
      phonenumber: '',
      email: '',
      password: '',
      role: '',
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make the API request to create a new staff member
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the users state with the new staff member
      setUsers((prevUsers) => [...prevUsers, response.data.data.user]);

      // Close the modal and reset form data
      handleModalClose();
    } catch (error) {
      console.error('Error creating staff:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-32 ml-32">
      {users.filter((user) => user.role !== 'user').map((user) => (
        <div key={user._id} className="max-w-sm rounded-md overflow-hidden shadow-lg mb-4">
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{user.firstname} {user.lastname}</h3>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Phone Number: {user.phonenumber}</p>
            <p>Role: {user.role}</p>
          </div>
        </div>
      ))}

      {/* Modal for creating a new staff member */}
      {showModal && (
     <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal Content */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleFormSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phonenumber">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phonenumber"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="input-field"
                        required
                      >
                        <option value="" disabled>Select Role</option>
                        <option value="administrator">Administrator</option>
                        <option value="user">User</option>
                        <option value="user">Vaccine Manager</option>
                        
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Create
                  </button>
                  <button
                    onClick={handleModalClose}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Display "Create New Staff" only for users with roles other than "user" */}
      {formData.role !== 'user' && (
        <div className="max-w-sm rounded-md overflow-hidden shadow-lg transition-transform transform hover:scale-105">
          <div
            onClick={handleCreate}
            className="bg-green-200 p-4 flex items-center justify-center text-5xl cursor-pointer"
          >
            <span role="img" aria-label="Create">
              ➕
            </span>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Create New Staff</h3>
            <p className="text-gray-700">Click to create a new staff member</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
