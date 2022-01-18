import React, { memo, Ref } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Message, UserDBSchema } from '../../appTypes';
import { useAppSelector } from '../../store/hooks';
import { Colors } from '../../utilities/colors';

interface Props {
  messages: Message[];
  onFetchMoreMessages: () => void;
  flatListRef: Ref<FlatList>;
}

const renderItem = (item: Message, user: UserDBSchema) => {
  const messageExtraStyles =
    item.senderUid === user.uid ? styles.sendMessage : styles.receivedMessage;
  return (
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
  );
};

const MessagesList = ({
  messages,
  onFetchMoreMessages,
  flatListRef,
}: Props): JSX.Element => {
  const user = useAppSelector((state) => state.userState.user) as UserDBSchema;

  return (
    <FlatList
      inverted
      renderItem={({ item }) => renderItem(item, user)}
      onEndReached={onFetchMoreMessages}
      data={messages}
      onEndReachedThreshold={0.5}
      ref={flatListRef}
    />
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

export default memo(MessagesList);
