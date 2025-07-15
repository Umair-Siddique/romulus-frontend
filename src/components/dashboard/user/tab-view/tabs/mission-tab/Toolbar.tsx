import { useState } from "react";
import {
  Box,
  Chip,
  Button,
  Menu,
  MenuItem,
  Stack,
  styled,
} from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import {
  CalendarToday as CalendarTodayIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { useUserContext } from "#context";

interface ToolBarProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  availableBranches: string[];
}

export const ToolBar = ({
  selectedStatus,
  setSelectedStatus,
  selectedBranch,
  setSelectedBranch,
  availableBranches
}: ToolBarProps) => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();
  
  const role = user?.role;

  const [dateAnchor, setDateAnchor] = useState(null);
  const [branchAnchor, setBranchAnchor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("Date");

  const dateOptions = ["Today", "This Week", "This Month", "Custom Range"];
  const branchOptions = availableBranches.length > 0 ? availableBranches : ["No Branch"];
  const statusFilters =
    role === "organization"
      ? ["All", "Pending", "Ongoing", "Completed"]
      : ["All", "Ongoing", "Completed"];

  const handleStatusClick = (status: any) => {
    setSelectedStatus(status);
  };

  const handleDateClick = (event: any) => {
    setDateAnchor(event.currentTarget);
  };

  const handleBranchClick = (event: any) => {
    setBranchAnchor(event.currentTarget);
  };

  const handleDateClose = () => {
    setDateAnchor(null);
  };

  const handleBranchClose = () => {
    setBranchAnchor(null);
  };

  const handleDateSelect = (option: any) => {
    setSelectedDate(option);
    handleDateClose();
  };

  const handleBranchSelect = (option: any) => {
    setSelectedBranch(option);
    handleBranchClose();
  };

  const CustomChip = styled(Chip)(({ theme }) => ({
    borderRadius: "12px",
    padding: theme.spacing(0.5, 1),
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: theme.spacing(3),
          flexWrap: "wrap",
          gap: theme.spacing(2),
        }}
      >
        {/* Left side - Status filters */}
        <Stack direction="row" spacing={1}>
          {statusFilters.map((status) => (
            <CustomChip
              key={status}
              label={status}
              onClick={() => handleStatusClick(status)}
              sx={{
                width: "auto",
                cursor: "pointer",
                padding: theme.spacing(0.5),
                color: theme.palette.text.primary,
                fontSize: theme.typography.body2.fontSize,
                fontWeight: selectedStatus === status ? 500 : 400,
                backgroundColor:
                  selectedStatus === status
                    ? theme.palette.primary.light
                    : theme.palette.background.default,
                border:
                  selectedStatus === status
                    ? "none"
                    : `1px solid ${theme.palette.text.disabled}`,
              }}
            />
          ))}
        </Stack>

        {/* Right side - Date and Branch filters */}
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            onClick={handleDateClick}
            endIcon={<KeyboardArrowDownIcon />}
            startIcon={<CalendarTodayIcon sx={{ fontSize: 18 }} />}
            sx={{
              textTransform: "none",
              color: theme.palette.text.secondary,
              borderColor: theme.palette.divider,
              "&:hover": {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            {selectedDate}
          </Button>

          <Button
            variant="outlined"
            onClick={handleBranchClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              textTransform: "none",
              color: theme.palette.text.secondary,
              borderColor: theme.palette.divider,
              "&:hover": {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            {selectedBranch}
          </Button>
        </Stack>
      </Box>

      {/* Date Menu */}
      <Menu
        anchorEl={dateAnchor}
        open={Boolean(dateAnchor)}
        onClose={handleDateClose}
      >
        {dateOptions.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleDateSelect(option)}
            sx={{
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>

      {/* Branch Menu */}
      <Menu
        anchorEl={branchAnchor}
        open={Boolean(branchAnchor)}
        onClose={handleBranchClose}
      >
        {branchOptions.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleBranchSelect(option)}
            sx={{
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
