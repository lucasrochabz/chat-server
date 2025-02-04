const chatService = require('../services/chatService');

const setupChatSocket = (io) => {
  // Estabelece a conexão do socket
  io.on('connection', (socket) => {
    // Obtém o IP do cliente
    const clienIp = socket.handshake.address;
    console.log('Um usuário se conectou');
    console.log(`Novo cliente conectado: ${clienIp}`);

    // Envia uma mensagem para todos os clientes conectados
    socket.on('chat message', async (msg) => {
      try {
        chatService.saveMessage(msg);

        // Emite a mensagem para todos os clientes
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
