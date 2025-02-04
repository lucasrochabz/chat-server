const socket = io('http://localhost:3000');

document.querySelector('button').addEventListener('click', () => {
  const msg = document.getElementById('message').value;
  socket.emit('chat message', msg); // Envia apenas para o cliente que enviou a mensagem
});
