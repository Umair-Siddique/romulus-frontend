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
  Business as BusinessIcon,
  Apartment as ApartmentIcon,
  LocationOn as LocationOnIcon,
  Schedule as ScheduleIcon,
  CalendarToday as CalendarTodayIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useDelete } from "@refinedev/core";
import { useTheme, Theme } from "@mui/material/styles";
import { Lock as LockIcon } from "@mui/icons-material";

import { Modal } from "#components/Modal";
import { useUserContext } from "#context";
import { formatDate, getStatusColor } from "#lib";

export const MissionCard = React.memo(
  ({ mission, refetch }: { mission: any; refetch: any }) => {
    const {
      _id,
      title,
      organizationName,
      branchName,
      date,
      time,
      branchAddress,
      status,
    } = mission;

    const theme = useTheme<Theme>();

    const { user, userProfile } = useUserContext();

    const role = user?.role;
    const { trainingStatus } = userProfile || {};

    const { mutate: deleteMission } = useDelete();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [openTrainingModal, setOpenTrainingModal] = useState(false);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleViewDetails = () => {
      if (trainingStatus === "pending") {
        setOpenTrainingModal(true);
        return;
      }
      navigate(`/missions/${_id}`);
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleDeleteMission = () => {
      deleteMission(
        {
          resource: "missions",
          id: _id,
          successNotification: {
            message: "Mission deleted successfully",
            type: "success",
          },
        },
        {
          onSuccess: () => {
            handleMenuClose();
            refetch();
          },
          onError: (error) => {
            handleMenuClose();
          },
        }
      );
    };

    return (
      <>
        <Card
          sx={{
            width: "48%",
            height: "auto",
            borderRadius: theme.shape.borderRadius,
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
                ...getStatusColor(status), // Use utility function to get status color
                fontWeight: theme.typography.fontWeightMedium,
                fontSize: theme.typography.caption.fontSize,
              }}
            />
          </Box>

          <CardContent sx={{ pt: theme.spacing(1) }}>
            <Typography
              variant="h5"
              component="h5"
              sx={{
                fontWeight: theme.typography.fontWeightMedium,
                mb: theme.spacing(1),
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
                <BusinessIcon
                  sx={{ color: theme.palette.text.secondary, fontSize: 22 }}
                />
                <Typography variant="body1" color="text.secondary">
                  {organizationName}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing(1.5),
                }}
              >
                <ApartmentIcon
                  sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {branchName}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing(1.5),
                }}
              >
                <CalendarTodayIcon
                  sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(date)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing(1.5),
                }}
              >
                <ScheduleIcon
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
                <LocationOnIcon
                  sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {branchAddress}
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
                onClick={handleViewDetails}
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
                Voir les détails
              </Button>

              {role !== "educator" && (
                <>
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
                    <MoreVertIcon />
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleDeleteMission}>Delete</MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </CardContent>
        </Card>
        <Modal
          open={openTrainingModal}
          onClose={() => setOpenTrainingModal(false)}
          title="Missions verrouillées"
          description="Vous devez terminer votre formation avant de pouvoir consulter ou accepter des missions. La formation vous aide à comprendre comment fonctionne le système de mission et vous prépare à travailler avec des organisations partenaires."
          hasButton={true}
          hasButton1={true}
          onSubmit={() => setOpenTrainingModal(false)}
          button1OnClick={() => navigate("/training")}
          buttonText="Close"
          button1Text="Start Training"
          icon={<LockIcon />}
        />
      </>
    );
  }
);
