const messages = []; // Array para armazenar as mensagens temporariamente

const saveMessage = (msgData) => {
  messages.push(msgData); // Armazena a mensagem na memória
  console.log(`Salvando mensagem: ${msgData.text}`);
};

const getHistoryMessages = () => {
  return messages; // Retorna todas as mensagens armazenadas
};

module.exports = { saveMessage, getHistoryMessages };
