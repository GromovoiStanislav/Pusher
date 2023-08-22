import 'dotenv/config';
import PusherPublisher from 'pusher';
import PusherSubscriber from 'pusher-js';

const Publisher = new PusherPublisher({
  appId: process.env.APP_ID,
  key: process.env.APP_KEY,
  secret: process.env.APP_SECRET,
  cluster: process.env.APP_CLUSTER,
  useTLS: true,
});

const Subscriber = new PusherSubscriber(process.env.APP_KEY, {
  cluster: process.env.APP_CLUSTER,
});

// Подписываемся на прослушивания сообщения в канале channel-1
const channel_1 = Subscriber.subscribe('channel-1');
// Подписываемся на прослушивания сообщения в канале channel-2
const channel_2 = Subscriber.subscribe('channel-2');

channel_1.bind('message', (data) => {
  console.log('channel-1/message', data);

  if (typeof data == 'object' && !!data && 'answer' in data && data.answer) {
    // Отправляем ответ
    Publisher.trigger('channel-1', 'response', {
      text: 'Привет от получателя!',
    });
  }
});

channel_1.bind('test_event', (data) => {
  console.log('channel-1/test_event', data);
});
channel_2.bind('test_event', (data) => {
  console.log('channel-2/test-event', data);
});

channel_1.bind('test-event-1', (data) => {
  console.log('channel-1/test-event-1', data);
});

channel_1.bind('test-event-2', (data) => {
  console.log('channel-1/test-event-2', data);
});
