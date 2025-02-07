const chatService = require('../services/chatService');

const setupChatSocket = (io) => {
  // Estabelece a conexão do socket
  io.on('connection', (socket) => {
    // Obtém o ID do usuário
    console.log('ID do usuário: ', socket.id);
    // Obtém o IP do usuário
    const clientIp = socket.handshake.address;
    console.log(`Um usuário se conectado. IP:${clientIp}`);

    // Enviar histórico de mensagens para o novo usuário
    const messages = chatService.getHistoryMessages();
    socket.emit('chat history', messages);

    // Envia uma mensagem para todos os clientes conectados
    socket.on('chat message', async (msg) => {
      const msgData = { id: socket.id, text: msg };
      try {
        chatService.saveMessage(msgData);
        io.emit('chat message', msgData); // Envia a mensagem para todos os clientes
      } catch (error) {
        console.error('Erro ao salvar a mensagem:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Usuário desconectado');
    });
  });
};

module.exports = { setupChatSocket };
