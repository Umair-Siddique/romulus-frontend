import { Box, Typography, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { truncateWithEllipsis } from "#utils";
import { useUserContext } from "#context";

export const ChatItem = ({
  chat,
  handleChatSelection,
  index,
}: {
  chat: any;
  handleChatSelection: (chat: any) => void;
  index: number;
}) => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const { userId } = user || {};

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
};
