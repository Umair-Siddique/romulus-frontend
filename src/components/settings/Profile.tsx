import { Box } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

export const Profile = ({ profileData }: { profileData: any }) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      sx={{
        mb: theme.spacing(2),
        fontWeight: theme.typography.h3.fontWeight,
        fontSize: theme.typography.h3.fontSize,
        fontFamily: theme.typography.h3.fontFamily,
        color: theme.palette.text.primary,
      }}
    >
      Manage Profile
    </Box>
  );
};
