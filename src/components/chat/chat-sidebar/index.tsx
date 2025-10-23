import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useMany } from "@refinedev/core";

import { ChatList } from "./ChatList";
import { useUserContext } from "#context";
import { SearchBox } from "./SearchBox";

export const ChatSidebar = ({
  chatList,
  onChatSelection,
}: {
  chatList: any;
  onChatSelection: (chat: any) => void;
}) => {
  const { user, userProfile } = useUserContext();

  const { userId, role } = user || {};

  const { data } = useMany({
    resource: role === "educator" ? "organizations" : "educators",
    ids:
      role === "educator"
        ? userProfile?.pastOrganizations
        : userProfile?.pastEducators, // array of user IDs you want to fetch
  });

  const existingContacts = useMemo(() => {
    if (!Array.isArray(chatList?.data)) return [];

    const recipients = chatList.data.map((chat: any) => chat?.recipient?.name);
    const senders = chatList.data.map((chat: any) => chat?.sender?.name);

    return [...recipients, ...senders].filter(Boolean);
  }, [chatList]);

  const newContacts = useMemo(() => {
    return (
      data?.data
        ?.map((contact: any) => ({
          _id: contact?.user?._id,
          createdAt: "",
          hasRead: true,
          message: "",
          recipient: {
            id: contact?.user?._id,
            name:
              contact?.organizationName ||
              `${contact?.firstName || ""} ${contact?.lastName || ""}`.trim(),
            avatar: contact?.avatar,
          },
          sender: {
            id: userId,
            name:
              role === "organization"
                ? userProfile?.organizationName
                : `${userProfile?.firstName || ""} ${
                    userProfile?.lastName || ""
                  }`.trim(),
            avatar: userProfile?.avatar,
          },
          time: new Date().toISOString(),
        }))
        .filter(
          (contact: any) => !existingContacts.includes(contact?.recipient?.name)
        ) || []
    );
  }, [data, role, userId, userProfile, chatList]);

  const combinedList = useMemo(() => {
    return {
      data: [...(chatList?.data || []), ...newContacts],
      total: (chatList?.data?.length || 0) + newContacts.length,
    };
  }, [chatList, newContacts]);

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

    const filtered = combinedList?.data?.filter((chat: any) => {
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
            ? combinedList // no search → show all
            : filteredChatList // search active → show filtered (even if empty)
        }
        onChatSelection={onChatSelection}
      />
    </Box>
  );
};
