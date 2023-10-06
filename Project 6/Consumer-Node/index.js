import 'dotenv/config';
import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.APP_KEY, {
  cluster: process.env.APP_CLUSTER,
  encrypted: true,
});

let channel = pusher.subscribe('my-channel');

channel.bind('my-event', (data) => {
  console.log(data.message);
});
console.log('Listening for messages...');
