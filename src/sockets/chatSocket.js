const chatService = require('../services/chatService');

const setupChatSocket = (io) => {
  // Estabelece a conexão do socket
  io.on('connection', (socket) => {
    // Obtém o ID e IP do usuário
    console.log('ID do usuário: ', socket.id);
    const clientIp = socket.handshake.address;
    console.log(`Um usuário se conectou. IP:${clientIp}`);

    // Envia a mensagem para os clientes conectados
    socket.broadcast.emit('user connected', {
      id: 'server',
      text: 'Alguém se conectou',
    });

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
      // Envia para todos os outros sockets
      socket.broadcast.emit('user disconnected', {
        id: 'server',
        text: 'Usuário desconectado',
      });
    });
  });
};

module.exports = { setupChatSocket };
