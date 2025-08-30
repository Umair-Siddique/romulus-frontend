import { Box, Slider, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  ExpandMore as ExpandMoreIcon,
  MyLocation as MyLocationIcon,
} from "@mui/icons-material";

interface RadiusSliderProps {
  anchorEl: null | HTMLElement;
  distance: number;
  setDistance: (distance: number) => void;
  setAnchorEl: (anchorEl: null | HTMLElement) => void;
  dropdownOpen: boolean;
}

export const RadiusSlider = ({
  anchorEl,
  distance,
  setDistance,
  setAnchorEl,
  dropdownOpen,
}: RadiusSliderProps) => {
  const theme = useTheme<Theme>();

  const handleDistanceChange = (_: Event, newValue: number | number[]) => {
    setDistance(newValue as number);
  };

  // Dropdown handlers
  const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 1000,
      }}
    >
      <Button
        variant="outlined"
        onClick={handleDropdownClick}
        endIcon={<ExpandMoreIcon />}
        startIcon={<MyLocationIcon />}
        sx={{
          backgroundColor: "white",
          textTransform: "none",
          minWidth: 120,
          boxShadow: theme.shadows[2],
          color: theme.palette.text.secondary,
        }}
      >
        Radius
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={dropdownOpen}
        onClose={handleDropdownClose}
        PaperProps={{
          sx: {
            mt: 1,
            ml: -5,
            width: 300,
            height: 85,
            borderRadius: theme.shape.borderRadius,
          },
        }}
      >
        <MenuItem disableRipple>
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
        </MenuItem>
      </Menu>
    </Box>
  );
};
