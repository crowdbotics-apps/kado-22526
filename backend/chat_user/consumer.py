import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer

from chat_user.api.v1.serializers import MessageSerializer
from chat_profile.models import Profile
from chat_user.models import Thread, Message

logger = logging.getLogger(__name__)


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if not self.scope.get('user').is_authenticated:
            # only allow authenticated users to receive messages
            await self.close(code=4123)
        self.thread_id = self.scope.get('url_route', {}).get('kwargs', {}).get('thread_id')
        self.room_group_name = 'chat_%s' % self.thread_id

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):

        if not self.scope.get('user').is_authenticated:
            # only allow authenticated users to receive messages
            await self.close(code=4123)

        user = self.scope.get('user')

        text_data_json = json.loads(text_data)
        message = text_data_json.get('message', '')
        to_profile_ids = text_data_json.get('to_profile_ids', '')
        attachment = text_data_json.get('attachment', '')
        profile = user.profile if hasattr(user, 'profile') else Profile.objects.create(user=user)

        data = {
            'thread_id': self.thread_id,
            'to_profile_ids': to_profile_ids,
            'content': message,
            'attachment': attachment
        }

        validated_data = MessageSerializer(data=data)
        if validated_data.is_valid():
            subject = 'DEFAULT SUBJECT'
            thread_id = data.get('thread_id')
            thread = None
            if thread_id:
                thread_qs = Thread.objects.filter(id=thread_id)
                if thread_qs.exists():
                    thread = thread_qs.first()
            if thread:
                msg = Message.new_reply(
                    profile=profile,
                    thread=thread,
                    content=data.get('content', '')
                )
            else:
                if len(data.get('to_profile_ids', [])) == 0:
                    logger.warning(msg="Recipients (to_profile_ids), profile ids.")
                    pass  # TODO: notify the socket client that adding a message failed
                msg = Message.new_message(
                    profile,
                    to_profiles=data.get('to_profile_ids'),
                    subject=subject,
                    content=data.get('content', '')
                )
            logger.warning('Message %s, saved successfully' % msg.content)
        else:
            logger.error(msg='Message data not valid: errors' + str(validated_data.errors))

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'thread_id': self.thread_id,
                'sender_id': profile.id,
                'username': user.username  # TODO: user profile.fullname
            }
        )

    # Receive message from room group
    async def chat_message(self, event):

        # Send message to WebSocket
        await self.send(text_data=json.dumps(event))