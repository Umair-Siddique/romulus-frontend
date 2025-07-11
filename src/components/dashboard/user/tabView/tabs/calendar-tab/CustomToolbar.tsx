import { ToolbarProps } from "react-big-calendar";
import { useTheme, Theme } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

const CustomToolbar = ({
  date,
  onNavigate,
  label,
}: ToolbarProps) => {
  const theme = useTheme<Theme>();

  const goToPrevious = () => {
    onNavigate("PREV");
  };

  const goToNext = () => {
    onNavigate("NEXT");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 2,
        mb: 2,
        px: 2,
        py: 1,
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton
          onClick={goToPrevious}
          sx={{
            backgroundColor: theme.palette.background.default,
            border: "1px solid",
            borderColor: theme.palette.divider,
            borderRadius: theme.shape.borderRadius,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={goToNext}
          sx={{
            backgroundColor: theme.palette.background.default,
            border: "1px solid",
            borderColor: theme.palette.divider,
            borderRadius: theme.shape.borderRadius,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: theme.typography.h2.fontWeight,
          color: "text.primary",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "2rem",
          // width: "275px",
          textAlign: "start",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default CustomToolbar;
