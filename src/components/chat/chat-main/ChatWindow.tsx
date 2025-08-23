import { useUserContext } from "#context";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const ChatWindow = ({ messages }: { messages: any[] }) => {
  const theme = useTheme();

  const { user } = useUserContext();

  const { userId } = user || {};

  return (
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
  );
};
