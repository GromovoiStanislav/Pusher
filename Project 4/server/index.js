require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

const app = express();
app.use(
  cors({
    origin: ['http://localhost:8080'],
  })
);
app.use(express.json());

app.post('/api/messages', async (req, res) => {
  pusher.trigger('chat', 'message', {
    message: req.body.message,
    username: req.body.username,
  });

  res.send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
