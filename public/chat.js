const socket = io('http://localhost:3000');

const inputElement = document.querySelector('#message');
const outputElement = document.querySelector('#output');
const btnSend = document.querySelector('#btn-send');

let mySocketId = null;

function renderMessage(message) {
  const pElement = document.createElement('p');
  if (message.id === mySocketId) {
    pElement.classList.add('my-message');
    pElement.textContent = `Você: ${message.text}`;
  } else if (message.id === 'server') {
    pElement.classList.add('server');
    pElement.textContent = `Servidor: ${message.text}`;
  } else {
    pElement.classList.add('other-message');
    pElement.textContent = `Usuário: ${message.text}`;
  }

  outputElement.appendChild(pElement);
}

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

socket.on('connect', () => {
  mySocketId = socket.id;
});

// Escuta o histórico de mensagens enviadas pelo servidor
socket.on('chat history', (messages) => {
  messages?.forEach(renderMessage);
  // const pElement = document.createElement('p');
  // pElement.textContent = message;
  // outputElement.appendChild(pElement);
});

// Escuta mensagens do servidor e exibe no chat
socket.on('chat message', (message) => {
  renderMessage(message);
});
