import React, { memo, Ref, useMemo } from 'react';
import { FlatList, Platform } from 'react-native';

import { Message, UserDBSchema } from '../../appTypes';
import { useAppSelector } from '../../store/hooks';
import Loader from '../ui/Loader';

import MessageItem from './MessageItem';

interface Props {
  messages: Message[];
  onFetchMoreMessages: () => void;
  flatListRef: Ref<FlatList>;
  fetching: boolean;
}

const MessagesList = ({
  messages,
  onFetchMoreMessages,
  flatListRef,
  fetching,
}: Props): JSX.Element => {
  const user = useAppSelector((state) => state.userState.user) as UserDBSchema;
  const theme = useAppSelector((state) => state.settingsState.theme);

  const renderItem = ({ item }: { item: Message }) => {
    return <MessageItem item={item} user={user} />;
  };

  const memoizedRenderItem = useMemo(() => renderItem, [messages]);

  return (
    <FlatList
      inverted={Platform.OS === 'ios'}
      renderItem={memoizedRenderItem}
      style={{ scaleY: -1 }}
      onEndReached={onFetchMoreMessages}
      data={messages}
      keyExtractor={(item) => item.id}
      ListFooterComponent={
        fetching ? (
          <Loader
            theme={theme}
            loaderStyles={{
              marginTop: 20,
            }}
          />
        ) : null
      }
    />
  );
};

export default memo(MessagesList);
