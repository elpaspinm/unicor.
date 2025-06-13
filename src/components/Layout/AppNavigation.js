import React from 'react';

const AppNavigation = ({ role, currentView, onChangeView }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {role === 'patient' && (
              <button
                onClick={() => onChangeView('education')}
                className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  currentView === 'education' ? 'border-blue-500 text-gray-900' : ''
                }`}
              >
                Educación
              </button>
            )}
             {(role === 'pharmacist' || role === 'admin') && (
              <>
                <button
                  onClick={() => onChangeView('pharmacistDashboard')}
                  className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    currentView === 'pharmacistDashboard' ? 'border-blue-500 text-gray-900' : ''
                  }`}
                >
                  Atención a Pacientes
                </button>
                 <button
                  onClick={() => onChangeView('pharmacistPublications')}
                  className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    currentView === 'pharmacistPublications' ? 'border-blue-500 text-gray-900' : ''
                  }`}
                >
                  Publicaciones
                </button>
                 <button
                  onClick={() => onChangeView('pharmacistTrainings')}
                  className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    currentView === 'pharmacistTrainings' ? 'border-blue-500 text-gray-900' : ''
                  }`}
                >
                  Capacitaciones
                </button>
                <button
                  onClick={() => onChangeView('pharmacistEducationEditor')}
                  className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    currentView === 'pharmacistEducationEditor' ? 'border-blue-500 text-gray-900' : ''
                  }`}
                >
                  Editor Educativo
                </button>
              </>
            )}
            {role === 'general_viewer' && ( // Nuevo rol unificado
              <button
                onClick={() => onChangeView('personalPublications')}
                className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  currentView === 'personalPublications' ? 'border-blue-500 text-gray-900' : ''
                }`}
              >
                Publicaciones
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavigation;

// DONE