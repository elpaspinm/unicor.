import React, { useState } from 'react';
import { getFromStorage } from '../utils/storage';
import initialMockUsers from '../mock/users'; // Usar el nombre renombrado

const PatientIdPage = ({ onLogin, onCancel }) => {
  const [identification, setIdentification] = useState('');
  const [error, setError] = useState('');

  const handleLoginAttempt = () => {
    // Asegurarse de que se obtenga de localStorage o del mock inicial
    const storedUsers = getFromStorage('users') || initialMockUsers; 
    const patientUser = storedUsers.find(user => user.role === 'patient' && user.id === parseInt(identification));

    if (patientUser) {
      onLogin(patientUser);
    } else {
      setError('Número de identificación no válido o paciente no registrado.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Acceso Paciente
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Ingresa tu número de identificación
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="identification" className="block text-sm font-medium text-gray-700">
                Número de Identificación
              </label>
              <input
                id="identification"
                name="identification"
                type="text"
                value={identification}
                onChange={(e) => setIdentification(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLoginAttempt()}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <div>
              <button
                onClick={handleLoginAttempt}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Acceder
              </button>
            </div>
            <div>
              <button
                onClick={onCancel}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientIdPage;