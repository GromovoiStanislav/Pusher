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

// Подписываемся на прослушивания ответа
const channel = Subscriber.subscribe('channel-1');
channel.bind('response', (data) => {
  console.log(data);
  //console.log('Received response:', data.text);
});

// Отправляем сообщение и ждем ответ
await Publisher.trigger('channel-1', 'message', {
  text: 'Привет 1 от отправителя!',
  answer: true,
});

// Отправляем сообщение
await Publisher.trigger('channel-1', 'message', {
  text: 'Привет 2 от отправителя!',
});

// Отправляем одним запросом сообщение в несколько каналов
await Publisher.trigger(['channel-1', 'channel-2'], 'test_event', {
  message: 'hello All',
});

// Отправляем одним запросом несколько сообщений
const events = [
  {
    channel: 'channel-1',
    name: 'test-event-1',
    data: { message: 'hello world' },
  },
  {
    channel: 'channel-1',
    name: 'test-event-2',
    data: { message: 'hello another world' },
  },
];
await Publisher.triggerBatch(events);
//console.log(res.json());
