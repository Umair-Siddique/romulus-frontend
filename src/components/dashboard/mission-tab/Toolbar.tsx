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
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  availableBranches: string[];
  availableOrganizations: string[];
  selectedOrganization: string;
  setSelectedOrganization: (organization: string) => void;
}

export const ToolBar = ({
  selectedStatus,
  setSelectedStatus,
  selectedBranch,
  setSelectedBranch,
  selectedDate,
  setSelectedDate,
  availableBranches,
  availableOrganizations,
  selectedOrganization,
  setSelectedOrganization,
}: ToolBarProps) => {
  const theme = useTheme<Theme>();
  const { user } = useUserContext();
  const role = user?.role;

  const [dateAnchor, setDateAnchor] = useState<null | HTMLElement>(null);
  const [branchAnchor, setBranchAnchor] = useState<null | HTMLElement>(null);
  const [organizationAnchor, setOrganizationAnchor] =
    useState<null | HTMLElement>(null);

  const dateOptions = ["Today", "This Week", "This Month", "All Time"];
  const branchOptions =
    availableBranches.length > 0 ? availableBranches : ["No Branch"];
  const organizationOptions =
    availableOrganizations.length > 0
      ? availableOrganizations
      : ["No Organization"];

  const statusFilters = ["All", "Pending", "Ongoing", "Completed"];

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
        <Stack direction="row" spacing={1}>
          {statusFilters.map((status) => (
            <CustomChip
              key={status}
              label={status}
              onClick={() => setSelectedStatus(status)}
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

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            onClick={(e) => setDateAnchor(e.currentTarget)}
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

          {role !== "educator" && (
            <Button
              variant="outlined"
              onClick={(e) => setBranchAnchor(e.currentTarget)}
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
          )}

          {role === "admin" && (
            <Button
              variant="outlined"
              onClick={(e) => setOrganizationAnchor(e.currentTarget)}
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
              {selectedOrganization}
            </Button>
          )}
        </Stack>
      </Box>

      {/* Date Menu */}
      <Menu
        anchorEl={dateAnchor}
        open={Boolean(dateAnchor)}
        onClose={() => setDateAnchor(null)}
      >
        {dateOptions.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              setSelectedDate(option);
              setDateAnchor(null);
            }}
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
        onClose={() => setBranchAnchor(null)}
      >
        {branchOptions.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              setSelectedBranch(option);
              setBranchAnchor(null);
            }}
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

      {/* Organization Menu */}
      <Menu
        anchorEl={organizationAnchor}
        open={Boolean(organizationAnchor)}
        onClose={() => setOrganizationAnchor(null)}
      >
        {organizationOptions.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              setSelectedOrganization(option);
              setOrganizationAnchor(null);
            }}
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
