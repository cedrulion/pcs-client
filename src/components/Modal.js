// Modal.js
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ pet, onClose }) => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {

    console.log('Location:', location);
    console.log('Date:', date);

    // Close the modal after submitting
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{`Add ${pet.name}`}</h2>
          <FaTimes className="cursor-pointer text-xl" onClick={onClose} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full"
          />
        </div>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modal;
