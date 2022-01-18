import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Message, Room } from '../../appTypes';
import { useAppSelector } from '../../store/hooks';
import { setError } from '../../store/reducers/appSlice';
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

const STEP = 20;

const Chat = ({ room }: Props): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const flatListRef = useRef<FlatList | null>(null);

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
      socket.emit('isTyping', { uid: room.receiverUid, isTyping: false });
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      await sendMessage(room.id, msg);
      socket.emit('send-message', msg);
    }
  };
  const onFetchMessages = useCallback(async () => {
    if (count < totalCount) {
      try {
        setShowLoader(true);
        const res = await getChat(
          combineUserUids(room.senderUid, room.receiverUid),
          count,
        );
        setCount(count + STEP);
        setMessages([...messages, ...res.data.messages]);
        setShowLoader(false);
      } catch (err) {
        setError(`${err}`);
        setShowLoader(false);
      }
    }
  }, [count, totalCount, messages]);

  const getChatRoomMessages = async () => {
    try {
      const res = await getChat(
        combineUserUids(room.senderUid, room.receiverUid),
        count,
      );
      setLoading(false);
      setTotalCount(res.data.totalCount);
      setCount(count + STEP);
      setMessages(res.data.messages);
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  };

  const onChangeText = (text: string) => {
    setMessage(text);
    const payload = { uid: room.receiverUid, isTyping: true };
    if (text > message) socket.emit('isTyping', payload);
  };

  useEffect(() => {
    socket.on('chat', (data: Message) => {
      handleNewMessage(data);
    });

    return () => {
      socket.off('chat');
    };
  }, [messages, socket]);

  useEffect(() => {
    socket.on('typing', (typing: boolean) => {
      setIsTyping(typing);
    });
    const timeout = setTimeout(() => {
      socket.emit('isTyping', { uid: room.receiverUid, isTyping: false });
    }, 1000);
    return () => {
      socket.off('typing');
      clearTimeout(timeout);
    };
  }, [socket]);

  useEffect(() => {
    getChatRoomMessages();
  }, []);

  return loading ? (
    <Loader theme={theme} />
  ) : (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme === 'dark' ? Colors.dark : Colors.light,
      }}>
      {showLoader && (
        <Loader
          theme={theme}
          loaderStyles={{
            marginTop: 30,
            backgroundColor: 'transparent',
            zIndex: 2,
          }}
        />
      )}
      <MessagesList
        flatListRef={flatListRef}
        messages={messages}
        onFetchMoreMessages={onFetchMessages}
      />
      {isTyping && (
        <View style={styles.receivedMessageContainer}>
          <View style={styles.receivedMessage}>
            <Text>...</Text>
          </View>
        </View>
      )}
      <SafeAreaView
        style={{
          ...styles.textInputContainer,
          backgroundColor: theme === 'dark' ? Colors.darker : Colors.lighter,
        }}>
        <TextInput
          multiline
          value={message}
          onChangeText={onChangeText}
          style={{
            color: theme === 'dark' ? Colors.light : Colors.dark,
            ...styles.textInput,
          }}
        />
        <Button type="transparent" onPress={onSendMessage} title="Send" />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
    padding: 0,
    width: '100%',
  },
  textInput: {
    width: '80%',
  },
  messageContainer: {
    maxWidth: '50%',
  },
  sendMessageContainer: {
    alignItems: 'flex-end',
  },
  receivedMessageContainer: {
    alignItems: 'flex-start',
  },
  sendMessage: {
    padding: 7,
    backgroundColor: Colors.secondary,
    borderRadius: 15,
    marginVertical: 5,
  },
  receivedMessage: {
    padding: 7,
    backgroundColor: Colors.third,
    borderRadius: 15,
    marginVertical: 5,
  },
});

export default Chat;
