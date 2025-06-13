import React, { useState, useEffect, useRef } from 'react';
import { getFromStorage, saveToStorage } from '../utils/storage';
import initialMockEducationalContent from '../mock/educationalContent'; // Usar el nombre renombrado

const PharmacistEducationEditorPage = () => {
  const [contentList, setContentList] = useState([]);
  const [editingContent, setEditingContent] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContentText, setNewContentText] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Asegurarse de que se obtenga de localStorage o del mock inicial
    const storedContent = getFromStorage('educationalContent') || initialMockEducationalContent; 
    setContentList(storedContent);
  }, []);

  const handleSaveContent = () => {
    if (!newTitle.trim() || !newContentText.trim() || !newCategory.trim()) {
      setError('Título, contenido y categoría son obligatorios.');
      return;
    }

    let updatedContentList;
    if (editingContent) {
      updatedContentList = contentList.map(item =>
        item.id === editingContent.id
          ? {
              ...item,
              title: newTitle.trim(),
              content: newContentText.trim(),
              category: newCategory.trim(),
              image: newImage ? URL.createObjectURL(newImage) : item.image,
              fileName: newFile ? newFile.name : item.fileName,
              fileUrl: newFile ? URL.createObjectURL(newFile) : item.fileUrl,
            }
          : item
      );
      setSuccessMessage('Contenido actualizado con éxito!');
    } else {
      const newId = Date.now();
      const newContentItem = {
        id: newId,
        title: newTitle.trim(),
        content: newContentText.trim(),
        category: newCategory.trim(),
        image: newImage ? URL.createObjectURL(newImage) : null,
        fileName: newFile ? newFile.name : null,
        fileUrl: newFile ? URL.createObjectURL(newFile) : null,
      };
      updatedContentList = [...contentList, newContentItem];
      setSuccessMessage('Contenido añadido con éxito!');
    }

    saveToStorage('educationalContent', updatedContentList);
    setContentList(updatedContentList);
    
    setEditingContent(null);
    setNewTitle('');
    setNewContentText('');
    setNewCategory('');
    setNewImage(null);
    setNewFile(null);
    setError('');

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleEditContent = (contentItem) => {
    setEditingContent(contentItem);
    setNewTitle(contentItem.title);
    setNewContentText(contentItem.content);
    setNewCategory(contentItem.category);
    setNewImage(null); // Reset image/file input for new selection
    setNewFile(null);
    setError('');
  };

  const handleDeleteContent = (id) => {
    const updatedContentList = contentList.filter(item => item.id !== id);
    saveToStorage('educationalContent', updatedContentList);
    setContentList(updatedContentList);
    setSuccessMessage('Contenido eliminado con éxito!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Editor de Contenido Educativo</h2>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{editingContent ? 'Editar Contenido' : 'Añadir Nuevo Contenido'}</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="contentText" className="block text-sm font-medium text-gray-700">Contenido</label>
            <textarea
              id="contentText"
              value={newContentText}
              onChange={(e) => setNewContentText(e.target.value)}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y"
            ></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
            <input
              type="text"
              id="category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors flex items-center space-x-2">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{newImage ? newImage.name : 'Subir Imagen'}</span>
            </label>
            <label className="cursor-pointer px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors flex items-center space-x-2">
              <input type="file" className="hidden" onChange={handleFileChange} />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.414 6.586a2 2 0 000 2.828l6.586 6.586a2 2 0 002.828 0l.04-.04a1 1 0 011.414 1.414l-.04.04a4 4 0 11-5.656 5.656L1 17.172a4 4 0 010-5.656l6.586-6.586a2 2 0 012.828 0z" />
              </svg>
              <span>{newFile ? newFile.name : 'Subir Archivo'}</span>
            </label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex space-x-2">
            <button
              onClick={handleSaveContent}
              className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {editingContent ? 'Guardar Cambios' : 'Añadir Contenido'}
            </button>
            {editingContent && (
              <button
                onClick={() => {
                  setEditingContent(null);
                  setNewTitle('');
                  setNewContentText('');
                  setNewCategory('');
                  setNewImage(null);
                  setNewFile(null);
                  setError('');
                }}
                className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar Edición
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Contenido Educativo Existente</h3>
        {contentList.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {contentList.map(item => (
              <li key={item.id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.title} <span className="text-gray-500 text-xs">({item.category})</span></p>
                  <p className="text-sm text-gray-600">{item.content.substring(0, 100)}...</p>
                  {item.image && <img src={item.image} alt="Contenido" className="mt-2 h-16 w-16 object-cover rounded-md" />}
                  {item.fileName && <p className="text-xs text-gray-500 mt-1">Archivo: {item.fileName}</p>}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditContent(item)}
                    className="px-3 py-1 bg-yellow-500 text-white text-xs rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteContent(item.id)}
                    className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay contenido educativo aún.</p>
        )}
      </div>
    </div>
  );
};

export default PharmacistEducationEditorPage;