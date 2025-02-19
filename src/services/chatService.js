const messages = []; // Array para armazenar as mensagens temporariamente

const saveMessage = (msgData) => {
  messages.push(msgData); // Armazena a mensagem na memória
  console.log(
    `Salvando mensagem. ID: ${msgData.id}, conteúdo: ${msgData.text}`,
  );
};

module.exports = { saveMessage };
