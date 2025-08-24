import { Box, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { ChatList } from "./ChatList";
import { useEffect, useState } from "react";
import { useUserContext } from "#context";
import { SearchBox } from "./SearchBox";

export const ChatSidebar = ({
  chatList,
  onChatSelection,
}: {
  chatList: any;
  onChatSelection: (chat: any) => void;
}) => {
  const theme = useTheme<Theme>();

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
        borderRight: `1px solid ${theme.palette.divider}`,
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
