import 'dotenv/config';
import express from 'express';
import { randomUUID } from 'node:crypto';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.APP_KEY,
  secret: process.env.APP_SECRET,
  cluster: process.env.APP_CLUSTER,
  useTLS: true,
});

const app = express();
app.use(express.json());

app.post('/messages', async (req, res) => {
  const message = {
    id: randomUUID(),
    username: req.body.username,
    message: req.body.message,
  };

  await pusher.trigger('chat', 'message/add', message);

  res.json(message);
});

app.delete('/messages/:id', async (req, res) => {
  const { id } = req.params;

  await pusher.trigger('chat', 'message/delete', id);

  res.send('OK');
});

app.listen(3001);
console.log('listening to port 3001');
