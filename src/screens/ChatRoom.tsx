import React from 'react';
import { NavPropsChatRoom, Room, UserDBSchema } from '../AppTypes';
import Chat from '../components/ChatRoom/Chat';
import { useAppSelector } from '../store/hooks';
import { combineUserUids } from '../utilities/utils';

const ChatRoom = ({ route }: NavPropsChatRoom): JSX.Element => {
  const user = useAppSelector((state) => state.userState.user) as UserDBSchema;
  const chatRoom: Room = {
    id: combineUserUids(user.uid, route.params.user.uid as string),
    messages: [],
    name: route.params.user.firstname,
    receiverName: route.params.user.firstname,
    senderName: route.params.user.firstname,
    receiverUid: route.params.user.uid,
    senderUid: user.uid,
  };

  return <Chat room={chatRoom as Room} />;
};

export default ChatRoom;
