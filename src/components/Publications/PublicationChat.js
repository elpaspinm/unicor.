import React, { useState, useEffect, useRef } from 'react';
import { getCentralizedData, saveCentralizedData } from '../../utils/storage';

const PublicationChat = ({ chatKey, title, canSendMessages }) => {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Cargar mensajes desde la "base de datos centralizada"
    const storedMessages = getCentralizedData(chatKey);
    setMessages(storedMessages);
  }, [chatKey]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!canSendMessages || (!newMessageText.trim() && !newImage && !newFile)) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: newMessageText.trim(),
      image: newImage ? URL.createObjectURL(newImage) : null,
      fileName: newFile ? newFile.name : null,
      fileUrl: newFile ? URL.createObjectURL(newFile) : null,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMessage];
    saveCentralizedData(chatKey, updatedMessages); // Guardar en la "base de datos centralizada"
    setMessages(updatedMessages);

    setNewMessageText('');
    setNewImage(null);
    setNewFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFile(file);
    }
  };

  return (
    <div className="flex flex-col h-96 border rounded-lg shadow-sm">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className="bg-gray-100 p-3 rounded-lg max-w-xs lg:max-w-md">
            {message.text && <p className="text-gray-800">{message.text}</p>}
            {message.image && <img src={message.image} alt="Publicación" className="mt-2 rounded-md max-h-40 object-cover" />}
            {message.fileUrl && message.fileName && (
              <div className="mt-2">
                <a href={message.fileUrl} download={message.fileName} className="text-blue-600 hover:underline">
                  Descargar: {message.fileName}
                </a>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {canSendMessages && (
        <div className="p-4 border-t bg-white">
          {newImage && <p className="text-sm text-gray-600 mb-2">Imagen seleccionada: {newImage.name}</p>}
          {newFile && <p className="text-sm text-gray-600 mb-2">Archivo seleccionado: {newFile.name}</p>}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <label className="cursor-pointer p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </label>
             <label className="cursor-pointer p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
              <input type="file" className="hidden" onChange={handleFileChange} />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.414 6.586a2 2 0 000 2.828l6.586 6.586a2 2 0 002.828 0l.04-.04a1 1 0 011.414 1.414l-.04.04a4 4 0 11-5.656 5.656L1 17.172a4 4 0 010-5.656l6.586-6.586a2 2 0 012.828 0z" />
              </svg>
            </label>
            <button
              onClick={handleSend}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicationChat;