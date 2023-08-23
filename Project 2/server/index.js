import 'dotenv/config';
import express from 'express';
import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.APP_KEY, {
  cluster: process.env.APP_CLUSTER,
});

const messages = [];

// Подписываемся на прослушивания сообщения в канале channel-1
const channel = pusher.subscribe('chat');

channel.bind('message/add', (data) => {
  messages.push({
    id: data.id,
    username: data.username,
    message: data.message,
  });
});

channel.bind('message/delete', (data) => {
  const index = messages.findIndex((message) => message.id === data);
  console.log(index);
  if (index !== -1) {
    messages.splice(index, 1);
  }
});

const app = express();
app.use(express.json());

app.get('/messages', async (req, res) => {
  res.json(messages);
});

app.listen(3002);
console.log('listening to port 3002');
