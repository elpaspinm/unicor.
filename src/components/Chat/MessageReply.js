import React from 'react';

const MessageReply = ({ message, onCancel }) => {
  if (!message) return null;

  return (
    <div className="relative bg-gray-100 p-3 rounded-lg mb-2 flex justify-between items-start">
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="flex-1 ml-6">
        <p className="text-xs text-gray-500">Respondiendo a:</p>
        <p className="text-sm truncate">{message.text}</p>
      </div>
      <button 
        onClick={onCancel}
        className="text-gray-500 hover:text-gray-700 ml-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default MessageReply;