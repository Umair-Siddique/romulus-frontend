import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Send as SendIcon } from "@mui/icons-material";

export const InputArea = ({
  message,
  setMessage,
  onSendMessage,
}: {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        my: theme.spacing(2),
        height: "45px",
        display: "flex",
      }}
    >
      <Box
        component="textarea"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{
          height: "100%",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: theme.spacing(2),
          mr: theme.spacing(1),
          overflow: "hidden",
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
        onClick={onSendMessage}
        disabled={!message.trim()}
        sx={{
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
  );
};
