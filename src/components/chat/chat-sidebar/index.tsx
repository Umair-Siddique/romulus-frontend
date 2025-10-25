import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useList } from "@refinedev/core";

import { ChatList } from "./ChatList";
import { SearchBox } from "./SearchBox";
import { useUserContext } from "#context";

export const ChatSidebar = ({
  chatList,
  onChatSelection,
  setSelectedSender,
  setSelectedRecipient,
}: {
  chatList: any;
  onChatSelection: (chat: any) => void;
  setSelectedSender: (sender: any) => void;
  setSelectedRecipient: (recipient: any) => void;
}) => {
  const { user } = useUserContext();
  const { role } = user || {};

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);

  // Fetch search results dynamically
  const { data: searchResultsData, refetch } = useList({
    resource: "search",
    filters: [
      { field: "role", operator: "eq", value: role },
      { field: "q", operator: "eq", value: searchValue },
    ],
    queryOptions: { enabled: false }, // we'll manually trigger
  });

  // Debounce search to avoid firing on every keystroke
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchValue.trim().length > 0) {
        refetch();
      } else {
        setSearchResults([]);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [searchValue, refetch]);

  useEffect(() => {
    if (searchResultsData?.data?.length && searchValue.trim().length > 0) {
      setSearchResults(searchResultsData.data);
    } else if (searchValue.trim().length > 0) {
      setSearchResults([]);
    }
  }, [searchResultsData, searchValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  return (
    <Box
      sx={{
        width: "22%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        px: 2,
        py: 2,
        borderRight: "1px solid #e0e0e0",
      }}
    >
      <SearchBox
        handleSearch={handleSearch}
        searchResults={searchResults}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setSearchResults={setSearchResults}
        setSelectedRecipient={setSelectedRecipient}
        setSelectedSender={setSelectedSender}
      />
      <ChatList chatList={chatList} onChatSelection={onChatSelection} />
    </Box>
  );
};
