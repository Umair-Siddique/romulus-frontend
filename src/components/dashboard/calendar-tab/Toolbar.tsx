// Calendar Toolbar - Updated with Organization Filter

import { useTheme, Theme } from "@mui/material/styles";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";
import { useState } from "react";
import { useUserContext } from "#context";

export const Toolbar = ({
  onNavigate,
  label,
  selectedBranch,
  setSelectedBranch,
  availableBranches,
  selectedOrganization,
  setSelectedOrganization,
  availableOrganizations,
}: any) => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const role = user?.role;

  const [branchAnchor, setBranchAnchor] = useState<null | HTMLElement>(null);
  const [organizationAnchor, setOrganizationAnchor] =
    useState<null | HTMLElement>(null);

  const branchOptions =
    availableBranches.length > 0 ? availableBranches : ["No Branch"];
  const organizationOptions =
    availableOrganizations.length > 0
      ? availableOrganizations
      : ["No Organization"];

  const goToPrevious = () => {
    onNavigate("PREV");
  };

  const goToNext = () => {
    onNavigate("NEXT");
  };

  const handleBranchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setBranchAnchor(event.currentTarget);
  };

  const handleBranchClose = () => {
    setBranchAnchor(null);
  };

  const handleBranchSelect = (option: string) => {
    setSelectedBranch(option);
    handleBranchClose();
  };

  const handleOrganizationClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setOrganizationAnchor(event.currentTarget);
  };

  const handleOrganizationClose = () => {
    setOrganizationAnchor(null);
  };

  const handleOrganizationSelect = (option: string) => {
    setSelectedOrganization(option);
    handleOrganizationClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mb: 2,
        px: 2,
        py: 1,
      }}
    >
      {/* Left side: Navigation buttons and label */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Stack direction="row" spacing={1}>
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
        </Stack>
        <Typography
          variant="h6"
          sx={{
            fontWeight: theme.typography.h2.fontWeight,
            color: "text.primary",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "2rem",
            textAlign: "start",
          }}
        >
          {label}
        </Typography>
      </Box>

      {/* Right side: Organization and Branch selectors */}
      {role !== "educator" && (
        <Stack direction="row" spacing={1}>
          {/* Organization selector - only show for admin */}
          {role === "admin" && (
            <Box>
              <Button
                variant="outlined"
                onClick={handleOrganizationClick}
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
              <Menu
                anchorEl={organizationAnchor}
                open={Boolean(organizationAnchor)}
                onClose={handleOrganizationClose}
              >
                {organizationOptions.map((option: string) => (
                  <MenuItem
                    key={option}
                    onClick={() => handleOrganizationSelect(option)}
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
            </Box>
          )}

          {/* Branch selector */}
          <Box>
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
            <Menu
              anchorEl={branchAnchor}
              open={Boolean(branchAnchor)}
              onClose={handleBranchClose}
            >
              {branchOptions.map((option: string) => (
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
          </Box>
        </Stack>
      )}
    </Box>
  );
};
