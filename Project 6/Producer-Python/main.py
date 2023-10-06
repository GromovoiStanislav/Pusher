import os
import sys
import pusher
from dotenv import load_dotenv

load_dotenv()

app_id = os.getenv("PUSHER_ID")
key = os.getenv("PUSHER_KEY")
secret = os.getenv("PUSHER_SECRET")
cluster = os.getenv("PUSHER_CLUSTER")

if not (app_id and key and secret and cluster):
    print("Please provide all Pusher environment variables in .env")
    sys.exit(1)

pusher_client = pusher.Pusher(
    app_id=app_id,
    key=key,
    secret=secret,
    cluster=cluster,
    ssl=True
)

print('Type a message...')

while True:
    user_input = input()
    user_input = user_input.strip()

    if user_input == 'exit':
        sys.exit(0)

    data = {'message': user_input}
    try:
        pusher_client.trigger('my-channel', 'my-event', data)
    except Exception as e:
        print('Error:', e)
