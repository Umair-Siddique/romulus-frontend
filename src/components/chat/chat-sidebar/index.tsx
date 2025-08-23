import { Box, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ChatList } from "./ChatList";

export const ChatSidebar = ({
  chatsList,
  handleChatSelection,
}: {
  chatsList: any;
  handleChatSelection: (chat: any) => void;
}) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      sx={{
        width: "20%",
        borderRight: `1px solid ${theme.palette.divider}`,
        px: 2,
        py: 2,
      }}
    >
      <ChatList
        chatsList={chatsList}
        handleChatSelection={handleChatSelection}
      />
    </Box>
  );
};
