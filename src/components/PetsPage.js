import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaPlus } from 'react-icons/fa';

const PetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', specie: '', breed: '', age: '', gender: '' });
  const petsPerPage = 9;
  const token = localStorage.getItem('Token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pets', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

  const handleCreate = async () => {
    try {
      setShowModal(true);
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({ name: '', specie: '', breed: '', age: '', gender: '' });
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredPets.length / petsPerPage);
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/pets/create', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPets((prevPets) => [...prevPets, response.data]);
      handleModalClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (petId) => {
    try {
      await axios.delete(`http://localhost:5000/api/pets/${petId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPets((prevPets) => prevPets.filter((pet) => pet._id !== petId));
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 ml-24">
      <div className="flex items-center mb-4">
        <div className="mr-2">
          <FaSearch size={20} />
        </div>
        <input
          type="text"
          placeholder="Search pets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {currentPets.map((pet, index) => (
          <div
            key={index}
            className="max-w-md mx-auto rounded-md overflow-hidden shadow-lg bg-white my-4"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{pet.name}</h3>
              <p className="text-gray-700">Breed: {pet.breed}</p>
              <p className="text-gray-700">Age: {pet.age}</p>
              <p className="text-gray-700">Gender: {pet.gender}</p>
              <p className="text-gray-700">Specie: {pet.specie}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPets.length < petsPerPage || currentPage * petsPerPage >= filteredPets.length}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
      {/* "Create New Pet" card */}
      <div className="max-w-md mx-auto rounded-md overflow-hidden shadow-lg bg-green-500 text-white my-4">
        <div
          onClick={handleCreate}
          className="p-6 flex items-center justify-center text-4xl cursor-pointer"
        >
          <FaPlus />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">Create New Pet</h3>
          <p className="text-gray-200">Click to create a new pet</p>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleFormSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Pet Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specie">
                      Specie
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="specie"
                      type="text"
                      placeholder="Specie"
                      value={formData.specie}
                      onChange={(e) => setFormData({ ...formData, specie: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breed">
                      Breed
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="breed"
                      type="text"
                      placeholder="Breed"
                      value={formData.breed}
                      onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                      Age
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="age"
                      type="text"
                      placeholder="Age"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                      Gender
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="Gender"
                      type="text"
                      placeholder="Gender"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      required
                    />
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
    </div>
  );
};

export default PetsPage;
