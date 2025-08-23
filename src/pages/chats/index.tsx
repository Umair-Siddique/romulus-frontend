import { useEffect, useState } from "react";
import { useUserContext } from "#context";
import { useLocation, useNavigate } from "react-router";
import { socket } from "#utils/socket";
import { Box } from "@mui/material";
import { useCreate, useList } from "@refinedev/core";
import { useTheme } from "@mui/material/styles";
import { ChatSidebar, ChatMain } from "#components";

export const Chats = () => {
  const theme = useTheme();

  const { user, userProfile } = useUserContext();

  const { userId, role } = user || {};

  const { firstName, lastName, organizationName, avatar } = userProfile || {};

  const userName = organizationName || `${firstName} ${lastName}`;

  const { state } = useLocation();

  const { recipient } = state || {};

  const navigate = useNavigate();

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedSender, setSelectedSender] = useState<any>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);

  useEffect(() => {
    if (role === "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    socket.on(`receive_message_${userId}`, (message) => {
      console.log("message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
      refetchChatsList();
    });

    return () => {
      socket.off(`receive_message_${userId}`);
    };
  }, [userId]);

  const { mutate: createMessage } = useCreate({
    resource: "chats/send-message",
    mutationOptions: {
      onSuccess: () => {
        refetchChatsList();
      },
    },
  });

  const { data: chatsList, refetch: refetchChatsList } = useList({
    resource: "chats/chats-list",
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

  const { data: chatMessages } = useList({
    resource: "chats/get-conversation",
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

  useEffect(() => {
    if (chatMessages?.data?.length) {
      setMessages(chatMessages?.data);
    }
  }, [chatMessages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    if (!recipient && !selectedRecipient) return;

    const newMessage = {
      sender: { id: userId, name: userName, avatar },
      recipient: recipient ?? selectedRecipient,
      message,
      time: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    createMessage({
      values: newMessage,
    });

    setMessage("");
  };

  const handleChatSelection = (chat: any) => {
    setSelectedSender(
      userId === chat?.recipient?.id ? chat?.recipient : chat?.sender
    );
    setSelectedRecipient(
      userId === chat?.recipient?.id ? chat?.sender : chat?.recipient
    );
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
        chatsList={chatsList}
        handleChatSelection={handleChatSelection}
      />
      <ChatMain
        selectedRecipient={selectedRecipient}
        messages={messages}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </Box>
  );
};
