import { Button } from "@mui/material";
import { useLogout } from "@refinedev/core";
import { useTheme, Theme } from "@mui/material/styles";
import { Logout as LogoutIcon } from "@mui/icons-material";

export const LogoutButton = () => {
  const theme = useTheme<Theme>();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<LogoutIcon />}
      sx={{
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main,
        mb: 2,
        textTransform: "none",
        "&:hover": {
          borderColor: theme.palette.error.main,
        },
      }}
      onClick={handleLogout}
    >
      Se déconnecter
    </Button>
  );
};
