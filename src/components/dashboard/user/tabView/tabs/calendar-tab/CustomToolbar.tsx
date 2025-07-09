import { ToolbarProps } from "react-big-calendar";
import { useTheme, Theme } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from "@mui/icons-material";

const CustomToolbar = ({
  date,
  onNavigate,
  label,
}: ToolbarProps<
  { id: number; title: string; start: Date; end: Date },
  object
>) => {
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
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 2,
        mb: 2,
        px: 2,
        py: 1,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "2rem",
          // width: "275px",
          textAlign: "start",
        }}
      >
        {label}
      </Typography>
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
    </Box>
  );
};

export default CustomToolbar;
