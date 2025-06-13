import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { getFromStorage, saveToStorage } from '../../utils/storage'; // Usar saveToStorage para chats individuales

const ChatWindow = ({ currentUser, otherUser, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesEndRef = useRef(null);

  // Key for localStorage based on the two users involved
  const chatStorageKey = `chat_${[currentUser.id, otherUser.id].sort().join('_')}`;

  useEffect(() => {
    const storedMessages = getFromStorage(chatStorageKey) || [];
    setMessages(storedMessages);
  }, [chatStorageKey]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReply = (message) => {
    setReplyingTo(message);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const handleSend = (newMessage) => {
    const updatedMessages = [...messages, newMessage];
    saveToStorage(chatStorageKey, updatedMessages); // Guardar en localStorage individual
    setMessages(updatedMessages);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 z-50">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-blue-500 text-white">
        <h2 className="text-lg font-semibold">Chat con {otherUser.name}</h2>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            isCurrentUser={message.senderId === currentUser.id}
            onReply={handleReply}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput 
        currentUserId={currentUser.id} 
        receiverId={otherUser.id}
        replyingTo={replyingTo}
        onCancelReply={handleCancelReply}
        onSend={handleSend}
      />
    </div>
  );
};

export default ChatWindow;