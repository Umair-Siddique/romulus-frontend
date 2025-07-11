import { Box, Slider, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

interface RadiusSliderProps {
  distance: number;
  handleDistanceChange: (event: Event, newValue: number | number[]) => void;
}

export const RadiusSlider = ({
  distance,
  handleDistanceChange,
}: RadiusSliderProps) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      sx={{
        position: "absolute",
        top: theme.spacing(0),
        right: theme.spacing(0),
        zIndex: 1000,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        padding: theme.spacing(1, 2),
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        minWidth: 300,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: "0.875rem", textAlign: "right" }}
      >
        {distance === 50
          ? `Default: ${distance} km`
          : `Radius: ${distance} km`}
      </Typography>
      <Slider
        value={distance}
        onChange={handleDistanceChange}
        min={10}
        max={100}
        step={10}
        marks
        valueLabelDisplay="auto"
        sx={{
          color: theme.palette.primary.main,
          "& .MuiSlider-thumb": {
            width: 20,
            height: 20,
          },
          "& .MuiSlider-track": {
            height: 4,
          },
          "& .MuiSlider-rail": {
            height: 4,
          },
        }}
      />
    </Box>
  );
};
