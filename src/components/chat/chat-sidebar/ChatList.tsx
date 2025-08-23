import { ChatItem } from "./ChatItem";

export const ChatList = ({
  chatsList,
  handleChatSelection,
}: {
  chatsList: any;
  handleChatSelection: (chat: any) => void;
}) => {
  return (
    <>
      {chatsList?.data?.map((chat: any, index: number) => (
        <ChatItem
          key={index}
          chat={chat}
          handleChatSelection={handleChatSelection}
          index={index}
        />
      ))}
    </>
  );
};
