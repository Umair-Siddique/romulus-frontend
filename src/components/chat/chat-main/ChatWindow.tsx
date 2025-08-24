import { useUserContext } from "#context";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useRef } from "react";

export const ChatWindow = ({ messages }: { messages: any[] }) => {
  const theme = useTheme();

  const { user } = useUserContext();

  const { userId } = user || {};

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.grey[50],
        p: 2,
      }}
    >
      {messages.map((msg, index) => {
        const isSender = userId === msg.sender.id;

        return (
          <Typography
            sx={{
              maxWidth: "70%",
              height: "auto",
              alignSelf: isSender ? "flex-end" : "flex-start",
              borderRadius: 2,
              mb: index === messages.length - 1 ? 0 : 2,
              bgcolor: isSender ? "#e6f3ff" : "#fff",
              color: isSender ? "black" : theme.palette.text.secondary,
              p: 1,
            }}
            key={index}
          >
            {msg?.message || ""}
          </Typography>
        );
      })}

      <div ref={messagesEndRef} />
    </Box>
  );
};
