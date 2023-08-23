import 'dotenv/config';
import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.APP_KEY, {
  cluster: process.env.APP_CLUSTER,
});

// Подписываемся на прослушивания сообщения в канале channel-1
const channel_1 = pusher.subscribe('channel-1');

channel_1.bind('message', (data) => {
  console.log('svc1/channel-1/message', data);
});

channel_1.bind('test_event', (data) => {
  console.log('svc1/channel-1/test_event', data);
});

channel_1.bind('test-event-1', (data) => {
  console.log('svc1/channel-1/test-event-1', data);
});

channel_1.bind('test-event-2', (data) => {
  console.log('svc1/channel-1/test-event-2', data);
});
