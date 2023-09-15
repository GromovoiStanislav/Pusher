import Pusher from 'pusher-js';

const form = document.getElementById('form');
const messageInput = document.getElementById('message-input');
const userInput = document.getElementById('username');

const messageContainer = document.getElementById('message-container');


const pusher = new Pusher('APP_KEY', {
  cluster: 'APP_CLUSTER',
});

const channel = pusher.subscribe('chat');
channel.bind('message', ({ message, username }) => {
  displayMessage(username, message);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const message = messageInput.value;
  const username = userInput.value;

  if (message === '') return;

  await fetch('http://localhost:3000/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      message: message,
    }),
  });

  messageInput.value = '';
});

function displayMessage(username, message) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;

  const usernameDiv = document.createElement('div');
  const strongElement = document.createElement('strong');
  strongElement.textContent = username;
  usernameDiv.appendChild(strongElement);

  const messageWrapperDiv = document.createElement('div');
  messageWrapperDiv.appendChild(usernameDiv);
  messageWrapperDiv.appendChild(messageDiv);

  const hrElement = document.createElement('hr');
  messageWrapperDiv.appendChild(hrElement);

  messageContainer.appendChild(messageWrapperDiv);
}
