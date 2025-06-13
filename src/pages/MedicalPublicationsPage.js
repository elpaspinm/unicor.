import React, { useState } from 'react';
import PublicationChat from '../components/Publications/PublicationChat';

const MedicalPublicationsPage = () => {
  const [currentSection, setCurrentSection] = useState('interactions'); // 'interactions' or 'alerts'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Publicaciones Farmacéuticas</h2>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setCurrentSection('interactions')}
          className={`px-4 py-2 rounded-md transition-colors ${currentSection === 'interactions' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Posibles Interacciones
        </button>
        <button
          onClick={() => setCurrentSection('alerts')}
          className={`px-4 py-2 rounded-md transition-colors ${currentSection === 'alerts' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Alertas Farmacéuticas
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {currentSection === 'interactions' && (
          <PublicationChat chatKey="interactions_chat" title="Chat de Posibles Interacciones" canSendMessages={false} />
        )}
        {currentSection === 'alerts' && (
          <PublicationChat chatKey="alerts_chat" title="Chat de Alertas Farmacéuticas" canSendMessages={false} />
        )}
      </div>
    </div>
  );
};

export default MedicalPublicationsPage;

// DONE