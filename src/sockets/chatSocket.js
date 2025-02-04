const chatService = require('../services/chatService');

const setupChatSocket = (io) => {
  // Estabelece a conexão do socket
  io.on('connection', (socket) => {
    // Obtém o IP do usuário
    const clienIp = socket.handshake.address;
    console.log(`Um usuário se conectado. IP:${clienIp}`);

    // Enviar histórico de mensagens para o novo usuário
    const messages = chatService.getMessages();
    socket.emit('chat history', messages);

    // Envia uma mensagem para todos os clientes conectados
    socket.on('chat message', async (msg) => {
      try {
        chatService.saveMessage(msg);
        io.emit('chat message', msg); // Envia a mensagem para todos os clientes
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
