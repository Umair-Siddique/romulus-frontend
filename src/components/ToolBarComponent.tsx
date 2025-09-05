import {
  Box,
  Chip,
  Button,
  Menu,
  MenuItem,
  Stack,
  styled,
} from "@mui/material";
import {
  CalendarToday as CalendarTodayIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useTheme, Theme } from "@mui/material/styles";

import { useUserContext } from "#context";

interface ToolBarProps {
  availableStatuses: string[];
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;

  availableDates: string[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;

  availableOrganizations?: string[];
  selectedOrganization?: string;
  setSelectedOrganization?: (organization: string) => void;

  availableBranches?: string[];
  selectedBranch?: string;
  setSelectedBranch?: (branch: string) => void;
}

export const ToolBarComponent = React.memo(
  ({
    availableStatuses,
    selectedStatus,
    setSelectedStatus,
    availableDates,
    selectedDate,
    setSelectedDate,
    availableOrganizations,
    selectedOrganization,
    setSelectedOrganization,
    availableBranches,
    selectedBranch,
    setSelectedBranch,
  }: ToolBarProps) => {
    const theme = useTheme<Theme>();
    const { user } = useUserContext();
    const role = user?.role;

    const [dateAnchor, setDateAnchor] = useState<null | HTMLElement>(null);
    const [branchAnchor, setBranchAnchor] = useState<null | HTMLElement>(null);
    const [organizationAnchor, setOrganizationAnchor] =
      useState<null | HTMLElement>(null);

    const CustomChip = styled(Chip)(({ theme }) => ({
      borderRadius: "12px",
      padding: theme.spacing(0.5, 1),
    }));

    const showOrganizationsFilter =
      availableOrganizations && availableOrganizations?.length > 0;
    const showBranchesFilter =
      availableBranches && availableBranches?.length > 0;

    return (
      <>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: theme.spacing(3),
            flexWrap: "wrap",
            gap: theme.spacing(2),
          }}
        >
          {/* Left-Side Filters */}
          <Stack direction="row" spacing={1}>
            {/* Status Filter */}
            {availableStatuses.map((status) => (
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

          {/* Right-Side Filters */}
          <Stack direction="row" spacing={1}>
            {/* Date Filter */}
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

            {/* Branch Filter */}
            {role !== "educator" && showBranchesFilter && (
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

            {/* Organization Filter */}
            {role === "admin" && showOrganizationsFilter && (
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
          {availableDates.map((option) => (
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
          {availableBranches?.map((option) => (
            <MenuItem
              key={option}
              onClick={() => {
                setSelectedBranch && setSelectedBranch(option);
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
          {availableOrganizations?.map((option) => (
            <MenuItem
              key={option}
              onClick={() => {
                setSelectedOrganization && setSelectedOrganization(option);
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
  }
);
