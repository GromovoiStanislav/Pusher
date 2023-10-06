import os
import sys

import pusher
from dotenv import load_dotenv
from flask import request, jsonify, Flask
from flask_cors import CORS

load_dotenv()

app_id = os.getenv("PUSHER_ID")
key = os.getenv("PUSHER_KEY")
secret = os.getenv("PUSHER_SECRET")
cluster = os.getenv("PUSHER_CLUSTER")

if not (app_id and key and secret and cluster):
    print("Please provide all Pusher environment variables ipython n .env")
    sys.exit(1)

app = Flask(__name__)
CORS(app)

pusher_client = pusher.Pusher(
    app_id=app_id,
    key=key,
    secret=secret,
    cluster=cluster,
    ssl=True
)

@app.route('/api/messages', methods=['POST'])
def send_message():
    data = request.get_json()
    message = data.get('message')
    username = data.get('username')

    pusher_client.trigger('chat', 'message', {
        'message': message,
        'username': username
    })

    return jsonify({'status': 'OK'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)