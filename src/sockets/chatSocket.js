const chatService = require('../services/chatService');

const setupChatSocket = (io) => {
  // Estabelece a conexão do socket
  io.on('connection', (socket) => {
    console.log('Um usuário se conectou');

    // Envia uma mensagem para todos os clientes conectados
    socket.on('chat message', async (msg) => {
      try {
        chatService.saveMessage(msg);
        io.emit('chat message', msg);
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
