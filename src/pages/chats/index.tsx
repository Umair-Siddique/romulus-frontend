import { useEffect, useState } from "react";
import { useUserContext } from "#context";
import { useLocation, useNavigate } from "react-router";
import { socket } from "#utils/socket";
import { Box } from "@mui/material";
import { useCreate, useList, useUpdate } from "@refinedev/core";
import { useTheme } from "@mui/material/styles";
import { ChatSidebar, ChatMain } from "#components";

export const Chats = () => {
  const { user, userProfile } = useUserContext();

  const { userId, role } = user || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedSender, setSelectedSender] = useState<any>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);

  const theme = useTheme();

  const { firstName, lastName, organizationName, avatar } = userProfile || {};

  const userName = organizationName || `${firstName} ${lastName}`;

  const { state } = useLocation();

  const { recipient } = state || {};

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
      enabled: !!userId,
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
      enabled: !!selectedRecipient?.id && !!selectedSender?.id,
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

    if (chat?.hasRead) return;

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
      <ChatSidebar chatList={chatList} onChatSelection={handleChatSelection} />
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
