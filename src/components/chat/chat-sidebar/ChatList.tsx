import { ChatItem } from "./ChatItem";

export const ChatList = ({
  chatList,
  onChatSelection,
}: {
  chatList: any;
  onChatSelection: (chat: any) => void;
}) => {
  return (
    <>
      {chatList?.data?.map((chat: any, index: number) => (
        <ChatItem
          key={index}
          chat={chat}
          onChatSelection={onChatSelection}
          index={index}
        />
      ))}
    </>
  );
};
