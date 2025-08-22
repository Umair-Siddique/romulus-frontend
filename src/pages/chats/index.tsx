import { useEffect, useState } from "react";
import { useUserContext } from "#context";
import { useLocation, useNavigate } from "react-router";
import { socket } from "#utils/socket";
import { Box, Typography } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { useCreate, useList } from "@refinedev/core";
import { truncateWithEllipsis } from "#utils";
import { useTheme } from "@mui/material/styles";

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

  console.log(messages);

  return (
    <Box
      sx={{
        display: "flex",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        height: "calc(100dvh - 150px)",
      }}
    >
      <Box
        sx={{
          width: "20%",
          borderRight: `1px solid ${theme.palette.divider}`,
          px: 2,
          py: 2,
        }}
      >
        {chatsList?.data?.map((chat, index) => {
          return (
            <Box
              onClick={() => handleChatSelection(chat)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "default",
                borderTop: `1px solid ${theme.palette.divider}`,
                py: 1,
              }}
              key={index}
            >
              <Box
                component="img"
                src={
                  chat?.recipient?.id === userId
                    ? chat?.sender?.avatar
                    : chat?.recipient?.avatar
                }
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                }}
                alt="recipient image"
              />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      m: 0,
                      p: 0,
                      fontWeight: theme.typography.fontWeightMedium,
                    }}
                  >
                    {truncateWithEllipsis(
                      chat?.recipient?.id === userId
                        ? chat?.sender?.name
                        : chat?.recipient?.name ?? "",
                      15
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      m: 0,
                      p: 0,
                      fontSize: theme.typography.body2.fontSize,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {truncateWithEllipsis(chat?.message || "")}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    m: 0,
                    p: 0,
                    fontSize: theme.typography.body2.fontSize,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {chat?.time.split("T")[1].split(".")[0].slice(0, 5)}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          px: 2,
          pt: 1,
        }}
      >
        {selectedRecipient && (
          <Box
            sx={{
              height: "60px",
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Box
              component="img"
              src={selectedRecipient?.avatar}
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
              }}
              alt="recipient image"
            />
            <Typography
              sx={{
                m: 0,
                p: 0,
                fontWeight: theme.typography.fontWeightMedium,
              }}
            >
              {selectedRecipient?.name}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            flex: 1,
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundColor: theme.palette.grey[50],
            p: 2,
          }}
        >
          {messages.map((msg, index) => {
            const isSender =
              userId === msg.sender.id || userId === msg.recipient.id;

            return (
              <Typography
                sx={{
                  maxWidth: "70%",
                  height: "auto",
                  alignSelf: isSender ? "flex-end" : "flex-start",
                  borderRadius: 2,
                  mb: index === messages.length - 1 ? 0 : 2,
                  bgcolor: isSender ? "#e6f3ff" : "#fff",
                  color: "black",
                  p: 1,
                }}
                key={index}
              >
                {msg?.message || ""}
              </Typography>
            );
          })}
        </Box>
        <Box sx={{ mt: 2, height: "60px", display: "flex" }}>
          <Box
            component="textarea"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              flex: 1,
              marginRight: theme.spacing(1),
              padding: theme.spacing(1),
              height: "45px",
              border: "none",
              outline: "none",
              backgroundColor: theme.palette.background.paper,
              borderRadius: theme.spacing(1),
              fontSize: theme.typography.body2.fontSize,
              fontFamily: theme.typography.body2.fontFamily,
              fontWeight: theme.typography.body2.fontWeight,
              color: theme.palette.text.primary,
              placeholderColor: theme.palette.text.secondary,
              resize: "none",
            }}
          />
          <Box
            component="button"
            onClick={sendMessage}
            disabled={!message.trim()}
            sx={{
              p: 1,
              height: "45px",
              width: "45px",
              borderRadius: theme.spacing(1),
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <SendIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
