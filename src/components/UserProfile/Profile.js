// src/components/UserProfile/Profile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Import the user service - update the path as needed


const Profile = () => {
//   const { userId } = useParams();
//   const [user, setUser] = useState(null);
 
//   useEffect(() => {
//     // Fetch user data when the component mounts
//     const fetchUserData = async () => {
//       try {
//         const response = await userService.getUserById(userId);
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <strong>Username:</strong> 
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {/* Add more user details as needed */}
    </div>
  );
};

export default Profile;
