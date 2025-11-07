import { Box, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { ChatHeader } from "./ChatHeader";
import { ChatWindow } from "./ChatWindow";
import { TextArea } from "./TextArea";

const EmptyChatWindow = () => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: (theme) =>
        theme.palette.mode === "light"
          ? "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)"
          : "linear-gradient(135deg, #1e1e1e 0%, #2b2b2b 100%)",
      color: "text.secondary",
      borderRadius: 2,
      border: "1px solid",
      borderColor: "divider",
      p: 4,
      textAlign: "center",
    }}
  >
    <Box
      sx={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.05)"
            : "rgba(255, 255, 255, 0.08)",
        mb: 2,
      }}
    >
      <ChatBubbleOutlineIcon sx={{ fontSize: 40, color: "text.secondary" }} />
    </Box>

    <Typography variant="h6" fontWeight={500} gutterBottom>
      Bienvenue dans vos messages
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
      Sélectionnez une conversation dans la barre latérale pour démarrer un
      échange et rester en contact.
    </Typography>
  </Box>
);

export const ChatMain = ({
  selectedRecipient,
  messages,
  message,
  setMessage,
  onSendMessage,
}: {
  selectedRecipient: any;
  messages: any[];
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
}) => {
  if (!selectedRecipient) {
    return <EmptyChatWindow />;
  }

  return (
    <Box
      sx={{
        width: "80%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        px: 2,
        pt: 1,
      }}
    >
      <ChatHeader selectedRecipient={selectedRecipient} />
      <ChatWindow messages={messages} />
      <TextArea
        message={message}
        setMessage={setMessage}
        onSendMessage={onSendMessage}
      />
    </Box>
  );
};
