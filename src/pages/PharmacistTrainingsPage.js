import React from 'react';
import PublicationChat from '../components/Publications/PublicationChat';

const PharmacistTrainingsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Capacitaciones</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <PublicationChat chatKey="trainings_chat" title="Chat de Capacitaciones" canSendMessages={true} />
      </div>
    </div>
  );
};

export default PharmacistTrainingsPage;