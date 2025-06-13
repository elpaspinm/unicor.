const messages = [
  // Mensajes de ejemplo para inicializar el chat si no hay nada en localStorage
  {
    id: 1,
    senderId: 1, // Farmacéutico Juan
    receiverId: 1062435310, // Cristian David Mendez Arriola (si se añade)
    text: "Bienvenido a FarmaConnect. ¿En qué puedo ayudarte?",
    timestamp: "2023-05-15T10:00:00Z",
    replyTo: null
  },
  {
    id: 2,
    senderId: 1062435310,
    receiverId: 1,
    text: "Hola, tengo una duda sobre un medicamento.",
    timestamp: "2023-05-15T10:01:00Z",
    replyTo: null
  }
];

export default messages;