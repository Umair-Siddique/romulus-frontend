import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Business,
  LocationOn,
  Schedule,
  CalendarToday,
  MoreVert,
} from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";

interface MissionCardProps {
  title: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  address: string;
  status: string;
}

export const MissionCard = ({
  title,
  venue,
  location,
  date,
  time,
  address,
  status,
}: MissionCardProps) => {
  const theme = useTheme<Theme>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`Selected action: ${action}`);
    handleMenuClose();
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: theme.shape.borderRadius * 1.5,
        border: `1px solid ${theme.palette.divider}`,
        position: "relative",
        backgroundColor: theme.palette.background.default,
        p: theme.spacing(1),
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: theme.spacing(2),
          right: theme.spacing(2),
        }}
      >
        <Chip
          label={status}
          sx={{
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.warning.dark,
            fontWeight: theme.typography.fontWeightMedium,
            fontSize: theme.typography.caption.fontSize,
          }}
        />
      </Box>

      <CardContent sx={{ pt: theme.spacing(1) }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: theme.typography.fontWeightLight,
            mb: theme.spacing(3),
            pr: theme.spacing(8),
            color: theme.palette.text.primary,
            textAlign: "left",
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {title}
        </Typography>

        <Stack spacing={theme.spacing(2)}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(1.5),
            }}
          >
            <Business
              sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
            />
            <Typography variant="body2" color="text.secondary">
              {venue}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(1.5),
            }}
          >
            <Business
              sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
            />
            <Typography variant="body2" color="text.secondary">
              {location}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(1.5),
            }}
          >
            <CalendarToday
              sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
            />
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(1.5),
            }}
          >
            <Schedule
              sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
            />
            <Typography variant="body2" color="text.secondary">
              {time}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(1.5),
            }}
          >
            <LocationOn
              sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
            />
            <Typography variant="body2" color="text.secondary">
              {address}
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: "flex",
            gap: theme.spacing(1),
            mt: theme.spacing(3),
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: theme.shape.borderRadius,
              textTransform: "none",
              fontWeight: theme.typography.fontWeightMedium,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            View Details
          </Button>

          <IconButton
            onClick={handleMenuClick}
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: theme.shape.borderRadius,
              color: theme.palette.primary.main,
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            <MoreVert />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleMenuItemClick("edit")}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("delete")}>
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </CardContent>
    </Card>
  );
};
