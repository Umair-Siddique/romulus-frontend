import { Box } from "@mui/material";

import { ChatHeader } from "./ChatHeader";
import { ChatWindow } from "./ChatWindow";
import { InputArea } from "./InputArea";

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
      <InputArea
        message={message}
        setMessage={setMessage}
        onSendMessage={onSendMessage}
      />
    </Box>
  );
};
