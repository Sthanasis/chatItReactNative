import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Message, Room } from '../../appTypes';
import { useAppSelector } from '../../store/hooks';
import { getChat, sendMessage } from '../../utilities/api';
import { Colors } from '../../utilities/colors';
import { socket } from '../../utilities/sockets';
import { combineUserUids } from '../../utilities/utils';
import Button from '../ui/Button';

import Loader from '../ui/Loader';
import MessagesList from './MessagesList';

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
    setMessages([data, ...messages]);
  };

  const onSendMessage = async () => {
    if (message.trim() !== '') {
      const msg: Message = {
        senderUid: room.senderUid,
        receiverUid: room.receiverUid,
        message,
        date: new Date(),
      };
      handleNewMessage(msg);
      setMessage('');
      const res = await sendMessage(room.id, msg);
      console.log(res);
      socket.emit('send-message', msg);
    }
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
      const res = await getChat(
        combineUserUids(room.senderUid, room.receiverUid),
        limit,
      );
      setLoading(false);

      setMessages(res.data);
    } catch (err) {
      console.log({ err });
    }
  };

  return loading ? (
    <Loader theme={theme} />
  ) : (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}>
      <MessagesList messages={messages} />
      <View
        style={{
          ...styles.textInputContainer,
          backgroundColor: theme === 'dark' ? Colors.darker : Colors.lighter,
        }}>
        <TextInput
          multiline
          value={message}
          onChangeText={setMessage}
          style={{
            color: theme === 'dark' ? Colors.light : Colors.dark,
            ...styles.textInput,
          }}
        />
        <Button type="transparent" onPress={onSendMessage} title="Send" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 0,
    width: '100%',
  },
  textInput: {
    width: '80%',
  },
});

export default Chat;
