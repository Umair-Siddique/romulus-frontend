import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Send as SendIcon } from "@mui/icons-material";

export const InputArea = ({
  message,
  setMessage,
  sendMessage,
}: {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
}) => {
  const theme = useTheme();

  return (
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
  );
};
