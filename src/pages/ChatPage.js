import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from '../components/Chat/ChatMessage';
import ChatInput from '../components/Chat/ChatInput';
import { getFromStorage, addToStorage } from '../utils/storage';

const ChatPage = ({ currentUser, otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedMessages = getFromStorage('messages') || [];
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredMessages = messages.filter(
    msg => 
      (msg.senderId === currentUser.id && msg.receiverId === otherUser.id) ||
      (msg.senderId === otherUser.id && msg.receiverId === currentUser.id)
  );

  const handleReply = (message) => {
    setReplyingTo(message);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const handleSend = (newMessage) => {
    addToStorage('messages', newMessage);
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-gray-800">Chat con {otherUser.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {filteredMessages.map(message => (
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

export default ChatPage;