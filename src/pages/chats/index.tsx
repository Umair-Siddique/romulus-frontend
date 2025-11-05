import { Box } from "@mui/material";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useCreate, useList, useUpdate } from "@refinedev/core";

import { socket } from "#lib";
import { useUserContext } from "#context";
import { ChatSidebar, ChatMain } from "#components";

export const Chats = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { user, userProfile } = useUserContext();

  const { recipient } = state || {};
  const { userId, isMessagesAllowed, role } = user || {};
  const { firstName, lastName, organizationName, avatar } = userProfile || {};

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedSender, setSelectedSender] = useState<any>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);

  const userName =
    role === "admin" ? "Admin" : organizationName || `${firstName} ${lastName}`;

  const { mutate: sendMessage } = useCreate({
    resource: "chats/send-message",
    mutationOptions: {
      onSuccess: () => {
        refetchChatList();
      },
    },
  });

  const { data: chatList, refetch: refetchChatList } = useList({
    resource: "chats/chat-list",
    filters: [
      {
        field: "userId",
        operator: "eq",
        value: userId,
      },
    ],
    queryOptions: {
      enabled: !!isMessagesAllowed,
    },
  });

  const { data: chatMessages, refetch: refetchChatMessages } = useList({
    resource: "chats/message-list",
    filters: [
      {
        field: "user1",
        operator: "eq",
        value: selectedRecipient?.id,
      },
      {
        field: "user2",
        operator: "eq",
        value: selectedSender?.id,
      },
    ],
    queryOptions: {
      enabled:
        !!isMessagesAllowed && !!selectedRecipient?.id && !!selectedSender?.id,
    },
  });

  const { mutate: updateMessage } = useUpdate({
    resource: "chats/update-message",
    mutationOptions: {
      onSuccess: () => {
        refetchChatList();
      },
    },
  });

  useEffect(() => {
    if (recipient) {
      setSelectedRecipient(recipient);
      setSelectedSender({
        id: userId,
        name: userName,
        avatar,
      });
    }
  }, [recipient]);

  useEffect(() => {
    socket.on(`receive_message_${userId}`, (message: any) => {
      if (selectedRecipient && selectedRecipient.id === message.recipient.id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }

      refetchChatMessages();
      refetchChatList();
    });

    return () => {
      socket.off(`receive_message_${userId}`);
    };
  }, [userId, selectedRecipient]);

  useEffect(() => {
    if (chatMessages?.data?.length && selectedRecipient) {
      setMessages(chatMessages?.data);
    }
  }, [chatMessages]);

  const handleChatSelection = (chat: any) => {
    setSelectedSender(
      userId === chat?.recipient?.id ? chat?.recipient : chat?.sender
    );

    setSelectedRecipient(
      userId === chat?.recipient?.id ? chat?.sender : chat?.recipient
    );

    setMessages((prevMessages) =>
      chatMessages?.total === 0 ? [] : [...prevMessages]
    );

    if (chat?.hasRead) {
      return;
    }

    updateMessage({
      id: chat?._id,
      values: {
        hasRead: true,
      },
    });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    if (!recipient && !selectedRecipient) return;

    const newMessage = {
      sender: { id: userId, name: userName, avatar },
      recipient: recipient ?? selectedRecipient,
      message,
      hasRead: false,
      time: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    sendMessage({
      values: newMessage,
    });

    setMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        height: "calc(100dvh - 150px)",
      }}
    >
      <ChatSidebar
        chatList={chatList}
        onChatSelection={handleChatSelection}
        setSelectedSender={setSelectedSender}
        setSelectedRecipient={setSelectedRecipient}
      />
      <Box sx={{ borderLeft: `1px solid ${theme.palette.divider}` }} />
      <ChatMain
        selectedRecipient={selectedRecipient}
        messages={messages}
        message={message}
        setMessage={setMessage}
        onSendMessage={handleSendMessage}
      />
    </Box>
  );
};
