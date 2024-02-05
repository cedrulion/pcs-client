import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Client = () => {
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

    fetchAllUsers();
  }, [token]);

  


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-32 ml-32">
       {users.filter((user) => user.role === 'user').map((user) => (
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

      
    </div>
  );
};

export default Client;
