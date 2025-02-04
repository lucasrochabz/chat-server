const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const chatRouter = require('./routes/chatRoute');
const chatSocket = require('./sockets/chatSocket');

const app = express(); // Instância do Express
const server = http.createServer(app); // Instância do servidor HTTP
const io = socketIo(server); // Instância do Socket.io

app.use(express.static(path.join(__dirname, 'public')));
app.use('/chat', chatRouter);

chatSocket.setupChatSocket(io);

module.exports = { app, server };
