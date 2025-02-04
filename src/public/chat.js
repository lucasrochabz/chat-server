const socket = io('http://localhost:3000');

const inputElement = document.querySelector('#message');
const outputElement = document.querySelector('#output');
const btnSend = document.querySelector('#btn-send');

// Escuta mensagens do servidor e exibe no chat
socket.on('chat message', (message) => {
  const pElement = document.createElement('p');
  pElement.textContent = message;
  outputElement.appendChild(pElement);
});

function handleMessage() {
  const message = inputElement.value.trim(); // Remove espaços extras

  if (message === '') return;

  socket.emit('chat message', message); // // Envia mensagem para o servidor

  inputElement.value = ''; // Limpa o campo de input
}

function handleEvent(event) {
  if (event.key === 'Enter' || event.type === 'click') {
    handleMessage();
  }
}

inputElement.addEventListener('keydown', handleEvent);
btnSend.addEventListener('click', handleEvent);
