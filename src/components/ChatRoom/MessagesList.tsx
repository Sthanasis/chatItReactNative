import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Message, UserDBSchema } from '../../appTypes';
import { useAppSelector } from '../../store/hooks';
import { Colors } from '../../utilities/colors';

interface Props {
  messages: Message[];
}

const renderItem = (item: Message, user: UserDBSchema) => {
  return (
    <View
      style={
        item.senderUid === user.uid
          ? styles.sendMessageContainer
          : styles.receivedMessageContainer
      }>
      <View
        style={
          item.senderUid === user.uid
            ? styles.sendMessage
            : styles.receivedMessage
        }>
        <Text>{item.message}</Text>
      </View>
    </View>
  );
};

const MessagesList = ({ messages }: Props): JSX.Element => {
  const user = useAppSelector((state) => state.userState.user) as UserDBSchema;

  return (
    <FlatList
      inverted
      renderItem={({ item }) => renderItem(item, user)}
      data={messages}
    />
  );
};

const styles = StyleSheet.create({
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

export default MessagesList;
