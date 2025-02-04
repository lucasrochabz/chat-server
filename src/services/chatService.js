const messages = []; // Array para armazenar as mensagens temporariamente

const saveMessage = (message) => {
  messages.push(message); // Armazena a mensagem na memória
  console.log(`Salvando mensagem: ${message}`);
};

const getMessages = () => {
  return messages; // Retorna todas as mensagens armazenadas
};

module.exports = { saveMessage, getMessages };
