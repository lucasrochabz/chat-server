const http = require('http');
const path = require('path');
const express = require('express');
const socketIo = require('socket.io');
const chatRouter = require('./src/routes/chatRoute');
const chatSocket = require('./src/sockets/chatSocket');

// Instância do Express
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/chat', chatRouter);

// Criando o servidor HTTP
const server = http.createServer(app);

// Configurando o Socket.io
const io = socketIo(server);
chatSocket.setupChatSocket(io);

// Iniciando o servidor
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
