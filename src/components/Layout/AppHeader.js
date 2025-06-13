import React from 'react';

const AppHeader = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Atención Farmacéutica</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">{user.name}</span>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${
            user.role === 'pharmacist' ? 'bg-blue-100 text-blue-600' : user.role === 'patient' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
          }`}>
            {user.avatar}
          </div>
          <button 
            onClick={onLogout}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

// DONE