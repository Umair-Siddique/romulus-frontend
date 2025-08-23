import { Box, Typography, Theme, useTheme } from "@mui/material";

export const ChatHeader = ({
  selectedRecipient,
}: {
  selectedRecipient: any;
}) => {
  const theme = useTheme<Theme>();

  return (
    selectedRecipient && (
      <Box
        sx={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Box
          component="img"
          src={selectedRecipient?.avatar}
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
          }}
          alt="recipient image"
        />
        <Typography
          sx={{
            m: 0,
            p: 0,
            fontWeight: theme.typography.fontWeightMedium,
          }}
        >
          {selectedRecipient?.name}
        </Typography>
      </Box>
    )
  );
};
