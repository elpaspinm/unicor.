import React, { useState, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '../utils/storage';
import initialMockUsers from '../mock/users'; // Usar el nombre renombrado

const PharmacistDashboardPage = ({ onSelectPatientForChat, onOpenChat }) => {
  const [allPatients, setAllPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientId, setNewPatientId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('active'); // 'active', 'trashed', 'all'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Asegurarse de que se obtenga de localStorage o del mock inicial
    const storedUsers = getFromStorage('users') || initialMockUsers; 
    const patientUsers = storedUsers.filter(user => user.role === 'patient');
    setAllPatients(patientUsers);
  }, []);

  useEffect(() => {
    let currentPatients = allPatients;

    // Apply search term
    if (searchTerm) {
      currentPatients = currentPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toString().includes(searchTerm)
      );
    }

    // Apply filter status
    if (filterStatus === 'active') {
      currentPatients = currentPatients.filter(patient => !patient.trashed);
    } else if (filterStatus === 'trashed') {
      currentPatients = currentPatients.filter(patient => patient.trashed);
    }

    setFilteredPatients(currentPatients);
  }, [allPatients, searchTerm, filterStatus]);

  const handleAddPatient = () => {
    if (!newPatientName.trim() || !newPatientId.trim()) {
      setError('Nombre y número de identificación son obligatorios.');
      return;
    }

    const storedUsers = getFromStorage('users') || initialMockUsers; // Usar el nombre renombrado
    const existingPatient = storedUsers.find(user => user.id === parseInt(newPatientId) || user.name === newPatientName.trim());

    if (existingPatient) {
      setError('Ya existe un paciente con este número de identificación o nombre.');
      return;
    }

    const newPatient = {
      id: parseInt(newPatientId),
      name: newPatientName.trim(),
      role: 'patient',
      avatar: newPatientName.trim().charAt(0).toUpperCase(),
      trashed: false
    };

    const updatedUsers = [...storedUsers, newPatient];
    saveToStorage('users', updatedUsers);
    setAllPatients(updatedUsers.filter(user => user.role === 'patient'));

    setNewPatientName('');
    setNewPatientId('');
    setError('');
    setSuccessMessage('Paciente añadido con éxito!');
    setShowAddPatientForm(false);

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleTrashPatient = (patientToTrash) => {
    const storedUsers = getFromStorage('users') || initialMockUsers; // Usar el nombre renombrado
    const updatedUsers = storedUsers.map(user => 
      user.id === patientToTrash.id ? { ...user, trashed: true } : user
    );
    saveToStorage('users', updatedUsers);
    setAllPatients(updatedUsers.filter(user => user.role === 'patient'));
  };

  const handleRestorePatient = (patientToRestore) => {
    const storedUsers = getFromStorage('users') || initialMockUsers; // Usar el nombre renombrado
    const updatedUsers = storedUsers.map(user => 
      user.id === patientToRestore.id ? { ...user, trashed: false } : user
    );
    saveToStorage('users', updatedUsers);
    setAllPatients(updatedUsers.filter(user => user.role === 'patient'));
  };

  const handleOpenChatWithPatient = (patient) => {
    onSelectPatientForChat(patient);
    onOpenChat();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Atención a Pacientes</h2>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <button
          onClick={() => setShowAddPatientForm(!showAddPatientForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>{showAddPatientForm ? 'Cancelar' : 'Añadir Nuevo Paciente'}</span>
        </button>

        <div className="flex-1">
           <input
            type="text"
            placeholder="Buscar por nombre o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-md transition-colors ${filterStatus === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-4 py-2 rounded-md transition-colors ${filterStatus === 'active' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Activos
          </button>
          <button
            onClick={() => setFilterStatus('trashed')}
            className={`px-4 py-2 rounded-md transition-colors ${filterStatus === 'trashed' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Papelera
          </button>
        </div>
      </div>


      {showAddPatientForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Nuevo Paciente</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                id="patientName"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Número de Identificación</label>
              <input
                type="text"
                id="patientId"
                value={newPatientId}
                onChange={(e) => setNewPatientId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              onClick={handleAddPatient}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Guardar Paciente
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Lista de Pacientes</h3>
        {filteredPatients.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredPatients.map(patient => (
              <li key={patient.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold mr-4 ${patient.trashed ? 'bg-gray-300 text-gray-700' : 'bg-green-100 text-green-600'}`}>
                    {patient.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-500">ID: {patient.id}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleOpenChatWithPatient(patient)}
                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Abrir Chat
                  </button>
                  {patient.trashed ? (
                    <button
                      onClick={() => handleRestorePatient(patient)}
                      className="px-3 py-1 bg-yellow-500 text-white text-xs rounded-md hover:bg-yellow-600 transition-colors"
                    >
                      Restaurar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleTrashPatient(patient)}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors"
                    >
                      Papelera
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No se encontraron pacientes.</p>
        )}
      </div>
    </div>
  );
};

export default PharmacistDashboardPage;