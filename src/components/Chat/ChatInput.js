import React, { useState } from 'react';
import MessageReply from './MessageReply';

const ChatInput = ({ currentUserId, receiverId, replyingTo, onCancelReply, onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        senderId: currentUserId,
        receiverId,
        text: message,
        timestamp: new Date().toISOString(),
        replyTo: replyingTo || null
      };
      
      onSend(newMessage);
      setMessage('');
      if (replyingTo) onCancelReply();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      {replyingTo && (
        <MessageReply message={replyingTo} onCancel={onCancelReply} />
      )}
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;

// DONE