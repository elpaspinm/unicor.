import React, { useState } from 'react';
import { getFromStorage } from '../utils/storage';
import initialMockUsers from '../mock/users';

const PasswordPage = ({ onLogin, selectedRole, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginAttempt = () => {
    const users = getFromStorage('users') || initialMockUsers;
    let userToLogin = null;

    if (selectedRole === 'pharmacist') {
      if (password === '1234') {
        userToLogin = users.find(u => u.role === 'pharmacist');
        if (userToLogin) {
          onLogin(userToLogin);
        } else {
          setError('Error al encontrar usuario farmacéutico.');
        }
      } else {
        setError('Contraseña incorrecta');
      }
    } else if (selectedRole === 'personal') { // Rol "personal" unificado
      if (password === '12345') {
        userToLogin = { id: 7, name: "Personal General", role: "general_viewer", avatar: "PG" };
        onLogin(userToLogin);
      } else {
        setError('Contraseña incorrecta');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Acceso {selectedRole === 'pharmacist' ? 'Farmacéutico' : 'Personal'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Ingresa la contraseña para acceder como {selectedRole === 'pharmacist' ? 'Farmacéutico' : 'Personal'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLoginAttempt()}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <div>
              <button
                onClick={handleLoginAttempt}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

export default PasswordPage;