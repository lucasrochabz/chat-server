const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express(); // Instância do Express
const server = http.createServer(app); // Instância do servidor HTTP
const io = socketIo(server); // Instância do Socket.io

// Serve o arquivo HTML para o chat
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Estabelece a conexão do socket
io.on('connection', (socket) => {
  console.log('Um usuário se conectou');

  // Envia uma mensagem para todos os clientes conectados
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

module.exports = server;
