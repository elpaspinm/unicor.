export const getFromStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const addToStorage = (key, value) => {
  try {
    const current = getFromStorage(key) || [];
    // Asegurarse de que 'current' sea un array antes de usar spread
    const updated = Array.isArray(current) ? [...current, value] : [value];
    saveToStorage(key, updated);
  } catch (error) {
    console.error('Error adding to localStorage:', error);
  }
};

// Función para simular una "base de datos" centralizada (en realidad, sigue siendo localStorage,
// pero con una lógica de inicialización más explícita para simular persistencia entre sesiones
// y la idea de que los datos "vienen de un servidor").
// En una aplicación real, aquí se integrarían llamadas a una API REST o a Firebase/Supabase.
export const getCentralizedData = (dataType) => {
  // Simula la carga de datos desde un "servidor" (localStorage global)
  // Esto es para que los datos persistan entre diferentes "sesiones" o "dispositivos"
  // si se accede a la misma URL en diferentes navegadores/dispositivos.
  // La clave es que todos los chats y publicaciones usen la misma fuente de verdad.
  return getFromStorage(`central_${dataType}`) || [];
};

export const saveCentralizedData = (dataType, data) => {
  // Simula el guardado de datos en un "servidor" (localStorage global)
  saveToStorage(`central_${dataType}`, data);
};