import { useUserContext } from "#context";
import { formatDate, getStatusColor } from "#utils";
import { Avatar, Typography, Box, Chip, useTheme } from "@mui/material";
import { useOne } from "@refinedev/core";

export const ProfileCard = ({
  educatorId,
  educatorData,
}: {
  educatorId: string;
  educatorData?: any;
}) => {
  const theme = useTheme();

  const userContext = useUserContext();
  const role = userContext?.user?.role;

  const userInfo = {
    name:
      `${educatorData?.firstName} ${educatorData?.lastName}` ||
      "Name Unavailable",
    phone: educatorData?.user.phone || "Phone Unavailable",
    email: educatorData?.user.email || "Email Unavailable",
    gender: educatorData?.gender || "Not Specified",
    dob:
      formatDate(educatorData?.dateOfBirth.split("T")[0]) ||
      "Date of Birth Unavailable",
    location:
      `${educatorData?.city} ${educatorData?.country}` ||
      "Location Unavailable",
    status: educatorData?.status || "Status Unavailable",
    avatar: educatorData?.avatar || "Avatar Unavailable",
  };

  const missions = {
    total: educatorData?.missionsHiredFor.length || 0,
    pending:
      educatorData?.missionsHiredFor.filter(
        (mission: any) => mission.status === "pending"
      ).length || 0,
    ongoing:
      educatorData?.missionsHiredFor.filter(
        (mission: any) => mission.status === "ongoing"
      ).length || 0,
    completed:
      educatorData?.missionsHiredFor.filter(
        (mission: any) => mission.status === "completed"
      ).length || 0,
  };

  const userInfoItems = [
    { label: "Phone:", value: userInfo.phone },
    { label: "Email:", value: userInfo.email },
    { label: "Gender:", value: userInfo.gender },
    { label: "DOB:", value: userInfo.dob },
    { label: "Location:", value: userInfo.location },
  ];

  const missionItems = [
    { label: "Total:", value: missions.total },
    { label: "Pending:", value: missions.pending },
    { label: "Ongoing:", value: missions.ongoing },
    { label: "Completed:", value: missions.completed },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        width: "100%",
      }}
    >
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
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
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
          {userInfoItems.map((item, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ width: 150 }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontWeight: theme.typography.h3.fontWeight }}
              >
                {item.value}
              </Typography>
            </Box>
          ))}

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ width: 150 }}
            >
              Status:
            </Typography>
            <Chip
              label={userInfo.status}
              size="small"
              sx={{
                ...getStatusColor(userInfo.status),
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Missions Section */}
      {role === "admin" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
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
                  sx={{ width: 150 }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontWeight: theme.typography.h3.fontWeight }}
                >
                  {item.value.toString().padStart(2, "0")}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

ProfileCard.displayName = "ProfileCard";
