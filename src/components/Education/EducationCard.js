import React from 'react';

const EducationCard = ({ content }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{content.title}</h3>
        <p className="text-gray-600">{content.content}</p>
      </div>
    </div>
  );
};

export default EducationCard;