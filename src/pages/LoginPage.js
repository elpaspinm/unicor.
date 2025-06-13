import React from 'react';

const LoginPage = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <img 
          className="mx-auto h-24 w-auto" 
          src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc06ZrsaSVFtni9pklCcebwvoumN4D1UEQ3aHWZ" 
          alt="Atención Farmacéutica Logo"
        />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Atención Farmacéutica
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Selecciona tu rol para continuar
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="grid grid-cols-1 gap-4">
          <div 
            onClick={() => onRoleSelect('pharmacist')}
            className="bg-white py-8 px-6 shadow sm:rounded-lg text-center cursor-pointer hover:bg-blue-50 transition-colors border-2 border-blue-200"
          >
            <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold mb-4">
              F
            </div>
            <h3 className="text-lg font-medium text-gray-900">Farmacéutico</h3>
            <p className="mt-1 text-sm text-gray-500">
              Acceso al servicio de consultas
            </p>
          </div>

          <div 
            onClick={() => onRoleSelect('patient')}
            className="bg-white py-8 px-6 shadow sm:rounded-lg text-center cursor-pointer hover:bg-green-50 transition-colors border-2 border-green-200"
          >
            <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl font-bold mb-4">
              P
            </div>
            <h3 className="text-lg font-medium text-gray-900">Paciente</h3>
            <p className="mt-1 text-sm text-gray-500">
              Acceso a información y consultas
            </p>
          </div>

          <div 
            onClick={() => onRoleSelect('personal')}
            className="bg-white py-8 px-6 shadow sm:rounded-lg text-center cursor-pointer hover:bg-purple-50 transition-colors border-2 border-purple-200"
          >
            <div className="mx-auto h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-2xl font-bold mb-4">
              T
            </div>
            <h3 className="text-lg font-medium text-gray-900">Personal</h3>
            <p className="mt-1 text-sm text-gray-500">
              Acceso para personal de la clínica
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;