import { Avatar, Typography, Box, Chip, Grid, useTheme } from "@mui/material";
import { useOne } from "@refinedev/core";

export const ProfileCard = ({
  missionId,
  educatorId,
}: {
  missionId: string;
  educatorId: string;
}) => {
  const theme = useTheme();

  const { data: educatorData } = useOne({
    resource: `educators/${educatorId}`,
    queryOptions: {
      enabled: !!educatorId,
    },
  });

  const userInfo = {
    name:
      `${educatorData?.data.firstName} ${educatorData?.data.lastName}` ||
      "Name Unavailable",
    phone: educatorData?.data.user.phone || "Phone Unavailable",
    email: educatorData?.data.user.email || "Email Unavailable",
    gender: educatorData?.data.gender || "Not Specified",
    dob: educatorData?.data.dateOfBirth || "Date of Birth Unavailable",
    location:
      `${educatorData?.data.city} ${educatorData?.data.country}` ||
      "Location Unavailable",
    status: educatorData?.data.status || "Status Unavailable",
    avatar: educatorData?.data.avatar || "Avatar Unavailable",
  };

  const missions = {
    total: educatorData?.data.missionsHiredFor.length || 0,
    pending:
      educatorData?.data.missionsHiredFor.filter(
        (mission: any) => mission.status === "pending"
      ).length || 0,
    ongoing:
      educatorData?.data.missionsHiredFor.filter(
        (mission: any) => mission.status === "ongoing"
      ).length || 0,
    completed:
      educatorData?.data.missionsHiredFor.filter(
        (mission: any) => mission.status === "completed"
      ).length || 0,
  };

  const missionItems = [
    { label: "Total:", value: missions.total },
    { label: "Pending:", value: missions.pending },
    { label: "Ongoing:", value: missions.ongoing },
    { label: "Completed:", value: missions.completed },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
      {/* Profile Avatar Section */}
      <Box
        sx={{
          flex: "0 0 auto",
          width: 200,
          height: 200,
          borderRadius: theme.shape.borderRadius,
          p: theme.spacing(3),
          border: `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          src={userInfo.avatar}
          alt={userInfo.name}
          sx={{
            width: "100%",
            height: "100%",
            mb: 2,
            border: `3px solid ${theme.palette.primary.light}`,
            boxShadow: theme.shadows[3],
          }}
        />
      </Box>

      {/* User Information Section */}
      <Box
        sx={{
          flex: "1 1 auto",
          minWidth: { xs: "100%", sm: "50%", md: "58.333%" },
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          {userInfo.name}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minWidth: 80, fontWeight: 500 }}
            >
              Phone:
            </Typography>
            <Typography variant="body2" color="text.primary">
              {userInfo.phone}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minWidth: 80, fontWeight: 500 }}
            >
              Email:
            </Typography>
            <Typography variant="body2" color="text.primary">
              {userInfo.email}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minWidth: 80, fontWeight: 500 }}
            >
              Gender:
            </Typography>
            <Typography variant="body2" color="text.primary">
              {userInfo.gender}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minWidth: 80, fontWeight: 500 }}
            >
              DOB:
            </Typography>
            <Typography variant="body2" color="text.primary">
              {userInfo.dob}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minWidth: 80, fontWeight: 500 }}
            >
              Location:
            </Typography>
            <Typography variant="body2" color="text.primary">
              {userInfo.location}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minWidth: 80, fontWeight: 500 }}
            >
              Status:
            </Typography>
            <Chip
              label={userInfo.status}
              size="small"
              sx={{
                backgroundColor: theme.palette.warning.light,
                color: theme.palette.warning.contrastText,
                fontWeight: 500,
                fontSize: "0.75rem",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Missions Section */}
      <Box
        sx={{
          flex: "0 0 auto",
          width: { xs: "100%", sm: "25%", md: "25%" },
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          Missions
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {missionItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  fontWeight: 600,
                  minWidth: 24,
                  textAlign: "right",
                }}
              >
                {item.value.toString().padStart(2, "0")}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

ProfileCard.displayName = "ProfileCard";
