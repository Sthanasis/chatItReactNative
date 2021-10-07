import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Message, Room } from '../../appTypes';
import { useAppSelector } from '../../store/hooks';
import { getChat } from '../../utilities/api';
import { socket } from '../../utilities/sockets';
import { combineUserUids } from '../../utilities/utils';
import * as storage from '../../utilities/asyncStorage';

interface Props {
  room: Room;
  onClose: () => void;
}

const Chat = ({ room, onClose }: Props): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [limit, setLimit] = useState(0);

  const userId = useAppSelector((state) => state.userState.user?.uid) || '';
  const receiverId =
    room.receiverUid === userId ? room.senderUid : room.receiverUid;

  const handleNewMessage = (data: Message) => {
    setMessages([...messages, data]);
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
      const token = await storage.getItem('token');
      if (token) {
        const res: any = await getChat(
          combineUserUids(userId, receiverId),
          limit,
          token
        );
        if (res.data.ok) {
          setLoading(false);
          setMessages(res.data.result);
        }
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const onHideChatHandler = (show: boolean) => {
    setShowChat(show);
  };
  return <View></View>;
};

export default Chat;
