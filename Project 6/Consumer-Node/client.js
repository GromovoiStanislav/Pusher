import 'dotenv/config';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.APP_KEY,
  secret: process.env.APP_SECRET,
  cluster: process.env.APP_CLUSTER,
  encrypted: true,
});

process.stdin.on('data', (chunk) => {
  const str = chunk.toString().trim();
  if (str === 'exit') {
    process.exit(0);
  }
  pusher.trigger('my-channel', 'my-event', {
    message: str,
  });
});
console.log('Type a message...');
