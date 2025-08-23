import { Box } from "@mui/material";

import { ChatHeader } from "./ChatHeader";
import { ChatWindow } from "./ChatWindow";
import { InputArea } from "./InputArea";

export const ChatMain = ({
  selectedRecipient,
  messages,
  message,
  setMessage,
  sendMessage,
}: {
  selectedRecipient: any;
  messages: any[];
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
}) => {
  return (
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
      <ChatHeader selectedRecipient={selectedRecipient} />
      <ChatWindow messages={messages} />
      <InputArea
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </Box>
  );
};
