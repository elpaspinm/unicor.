import React from 'react';

const ChatMessage = ({ message, isCurrentUser, onReply }) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isCurrentUser && (
        <button 
          className="self-center mr-2 text-gray-400 hover:text-blue-500"
          onClick={() => onReply(message)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v1a1 1 0 11-2 0v-1a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      
      <div 
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} cursor-pointer hover:shadow-md transition-shadow`}
        onClick={() => onReply(message)}
      >
        {message.replyTo && (
          <div className={`text-xs mb-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="inline h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v1a1 1 0 11-2 0v-1a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Respondiendo a: {message.replyTo.text}
          </div>
        )}
        <p>{message.text}</p>
        <p className="text-xs opacity-70 mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {isCurrentUser && (
        <button 
          className="self-center ml-2 text-gray-400 hover:text-blue-500"
          onClick={() => onReply(message)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatMessage;

// DONE