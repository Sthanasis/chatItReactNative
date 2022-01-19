import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Message, UserDBSchema } from '../../appTypes';
import { Colors } from '../../utilities/colors';

interface Props {
  item: Message;
  user: UserDBSchema;
}

const MessageItem = ({ item, user }: Props): JSX.Element => {
  const messageExtraStyles = useMemo(
    () =>
      item.senderUid === user.uid ? styles.sendMessage : styles.receivedMessage,
    [item, user],
  );
  return (
    <View style={{ scaleY: -1 }}>
      <View
        style={
          item.senderUid === user.uid
            ? styles.sendMessageContainer
            : styles.receivedMessageContainer
        }>
        <View style={{ ...styles.messageContainer, ...messageExtraStyles }}>
          <Text style={{ fontSize: 18 }}>{item.message}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default memo(MessageItem);
