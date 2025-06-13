import React, { useState, useEffect } from 'react';
import EducationCard from '../components/Education/EducationCard';
import { getFromStorage } from '../utils/storage';
import initialMockEducationalContent from '../mock/educationalContent'; // Usar el nombre renombrado

const PatientEducationPage = () => {
  const [content, setContent] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Asegurarse de que se obtenga de localStorage o del mock inicial
    const storedContent = getFromStorage('educationalContent') || initialMockEducationalContent; 
    setContent(storedContent);
  }, []);

  const filteredContent = filter === 'all' 
    ? content 
    : content.filter(item => item.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contenido Educativo</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('antibiotics')}
            className={`px-4 py-2 rounded-full ${filter === 'antibiotics' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Antibióticos
          </button>
          <button
            onClick={() => setFilter('self-medication')}
            className={`px-4 py-2 rounded-full ${filter === 'self-medication' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Automedicación
          </button>
          <button
            onClick={() => setFilter('medication_use')}
            className={`px-4 py-2 rounded-full ${filter === 'medication_use' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Uso de Medicamentos
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {filteredContent.map(item => (
          <EducationCard key={item.id} content={item} />
        ))}
      </div>
    </div>
  );
};

export default PatientEducationPage;

// DONE