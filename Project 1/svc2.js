import 'dotenv/config';
import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.APP_KEY, {
  cluster: process.env.APP_CLUSTER,
});

// Подписываемся на прослушивания сообщения в канале channel-2
const channel_2 = pusher.subscribe('channel-2');

channel_2.bind('test_event', (data) => {
  console.log('svc2/channel-2/test-event', data);
});

channel_2.bind('test-event-1', (data) => {
  console.log('svc2/channel-2/test-event-1', data);
});
