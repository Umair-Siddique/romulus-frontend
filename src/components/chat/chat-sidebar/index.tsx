import { Box } from "@mui/material";

import { ChatList } from "./ChatList";
import { useState } from "react";
import { useUserContext } from "#context";
import { SearchBox } from "./SearchBox";

export const ChatSidebar = ({
  chatList,
  onChatSelection,
}: {
  chatList: any;
  onChatSelection: (chat: any) => void;
}) => {
  const { user } = useUserContext();

  const { userId } = user || {};

  const [filteredChatList, setFilteredChatList] = useState<any>({
    data: [],
    total: 0,
  });

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    if (!value.trim()) {
      setFilteredChatList({ data: [], total: 0 });
      return;
    }

    const filtered = chatList?.data?.filter((chat: any) => {
      const userName = (
        chat?.recipient?.id === userId
          ? chat?.sender?.name
          : chat?.recipient?.name
      )?.toLowerCase();

      const userMessage = chat?.message?.toLowerCase();

      return userName?.includes(value) || userMessage?.includes(value);
    });

    setFilteredChatList({ data: filtered, total: filtered?.length });
  };

  return (
    <Box
      sx={{
        width: "20%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        px: 2,
        py: 2,
      }}
    >
      <SearchBox handleSearch={handleSearch} />
      <ChatList
        chatList={
          !searchValue
            ? chatList // no search → show all
            : filteredChatList // search active → show filtered (even if empty)
        }
        onChatSelection={onChatSelection}
      />
    </Box>
  );
};
