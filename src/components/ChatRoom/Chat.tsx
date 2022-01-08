import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Message, Room } from '../../appTypes';
import { useAppSelector } from '../../store/hooks';
import { getChat } from '../../utilities/api';
import { socket } from '../../utilities/sockets';
import { combineUserUids } from '../../utilities/utils';
import Button from '../ui/Button';
import Input from '../ui/Input';

import Loader from '../ui/Loader';

interface Props {
  room: Room;
}

const Chat = ({ room }: Props): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [limit, setLimit] = useState(0);
  const [message, setMessage] = useState('');

  const theme = useAppSelector((state) => state.settingsState.theme);

  const handleNewMessage = (data: Message) => {
    setMessages([...messages, data]);
  };

  const onSendMessage = () => {
    const msg: Message = {
      senderUid: room.senderUid,
      receiverUid: room.receiverUid,
      message,
      date: new Date(),
      senderName: room.senderName,
      receiverName: room.receiverName,
    };
    handleNewMessage(msg);
    socket.emit('send-message', msg);
    setMessage('');
  };

  useEffect(() => {
    socket.on('chat', (data: Message) => {
      handleNewMessage(data);
    });

    return () => {
      socket.off('chat');
    };
  }, [messages]);

  useEffect(() => {
    socket.on('typing', (typing: boolean) => {
      setIsTyping(typing);
    });
    return () => {
      socket.off('typing');
    };
  }, [isTyping]);

  useEffect(() => {
    getChatRoomMessages();
  }, [limit]);

  const getChatRoomMessages = async () => {
    try {
      const res: any = await getChat(
        combineUserUids(room.senderUid, room.receiverUid),
        limit,
      );
      setLoading(false);
      setMessages(res.data.result);
    } catch (err) {
      console.log({ err });
    }
  };

  return loading ? (
    <Loader theme={theme} />
  ) : (
    <View>
      <ScrollView>
        {messages.map((mesg) => (
          <View key={mesg.date.toString()}>
            <Text>{mesg.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View>
        <Input type="textarea" value={message} onChangeText={setMessage} />
        <Button type="transparent" onPress={onSendMessage} title="Send" />
      </View>
    </View>
  );
};

export default Chat;
