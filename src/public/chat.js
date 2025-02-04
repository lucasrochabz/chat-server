const socket = io('http://localhost:3000');

const inputElement = document.querySelector('#message');
const outputElement = document.querySelector('#output');
const btnSend = document.querySelector('#btn-send');

function handleMessage() {
  let message = inputElement.value;

  if (message === '') return null;

  const pElement = document.createElement('p');
  pElement.textContent = message;
  outputElement.appendChild(pElement);
  socket.emit('chat message', message); // Envia apenas para o cliente que enviou a mensagem

  inputElement.value = '';
}

function handleEvent(event) {
  if (event.key === 'Enter' || event.type === 'click') {
    handleMessage();
  }
}

inputElement.addEventListener('keydown', handleEvent);
btnSend.addEventListener('click', handleEvent);
