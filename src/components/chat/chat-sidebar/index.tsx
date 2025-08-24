import { Box, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { ChatList } from "./ChatList";

export const ChatSidebar = ({
  chatList,
  onChatSelection,
}: {
  chatList: any;
  onChatSelection: (chat: any) => void;
}) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      sx={{
        width: "20%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: `1px solid ${theme.palette.divider}`,
        px: 2,
        py: 2,
      }}
    >
      <ChatList chatList={chatList} onChatSelection={onChatSelection} />
    </Box>
  );
};
