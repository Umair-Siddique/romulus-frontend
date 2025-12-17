import { useUserContext } from "#context";
import { formatDate, getStatusColor, translateStatusLabel } from "#lib";
import { Avatar, Typography, Box, Chip, useTheme } from "@mui/material";
import { useOne } from "@refinedev/core";

export const ProfileCard = ({
  educatorData,
  organizationData,
  parentComponent,
}: {
  educatorData?: any;
  organizationData?: any;
  parentComponent?: string;
}) => {
  const theme = useTheme();

  const userContext = useUserContext();
  const role = userContext?.user?.role;

  const { data } = useOne({
    resource: `missions/organization/${organizationData?._id}`,
    queryOptions: {
      enabled: !!organizationData?._id,
    },
  });

  const organizationMissions = data?.data;

  const userInfo = {
    name: educatorData
      ? `${educatorData?.firstName} ${educatorData?.lastName}`
      : organizationData?.organizationName || "N/A",
    phone: educatorData?.user?.phone || "N/A",
    siretNumber: organizationData?.siretNumber || "N/A",
    email: educatorData
      ? educatorData?.user?.email
      : organizationData?.user?.email || "N/A",
    gender: educatorData?.gender || "N/A",
    address: organizationData?.officeAddress || "N/A",
    dob: formatDate(educatorData?.dateOfBirth.split("T")[0]) || "N/A",
    founded: formatDate(organizationData?.createdAt.split("T")[0]) || "N/A",
    location: educatorData
      ? `${educatorData?.city} ${educatorData?.country}`
      : `${organizationData?.city} ${organizationData?.country}` || "N/A",
    status: educatorData?.status || organizationData?.status || "N/A",
    avatar: educatorData?.avatar || organizationData?.avatar || "N/A",
  };

  const missions = {
    total: educatorData
      ? educatorData?.missionsHiredFor.length
      : organizationMissions?.length || 0,
    pending: educatorData
      ? educatorData?.missionsHiredFor.filter(
          (mission: any) => mission.status === "pending"
        ).length
      : organizationMissions?.filter(
          (mission: any) => mission.status === "pending"
        ).length || 0,
    ongoing: educatorData
      ? educatorData?.missionsHiredFor.filter(
          (mission: any) => mission.status === "ongoing"
        ).length
      : organizationMissions?.filter(
          (mission: any) => mission.status === "ongoing"
        ).length || 0,
    completed: educatorData
      ? educatorData?.missionsHiredFor.filter(
          (mission: any) => mission.status === "completed"
        ).length
      : organizationMissions?.filter(
          (mission: any) => mission.status === "completed"
        ).length || 0,
  };

  const userInfoItems = [
    {
      label: `${educatorData ? "Phone:" : "Numéro SIRET:"}`,
      value: educatorData ? userInfo.phone : userInfo.siretNumber,
    },
    { label: "Email:", value: userInfo.email },
    {
      label: `${educatorData ? "Genre:" : "Adresse du bureau:"}`,
      value: educatorData ? userInfo.gender : userInfo.address,
    },
    {
      label: `${educatorData ? "Date de naissance:" : "Fondée:"}`,
      value: educatorData ? userInfo.dob : userInfo.founded,
    },
    { label: "Location:", value: userInfo.location },
  ];

  const missionItems = [
    { label: "Totale:", value: missions.total },
    { label: "En attente:", value: missions.pending },
    { label: "En cours:", value: missions.ongoing },
    { label: "Terminé:", value: missions.completed },
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
              Statut:
            </Typography>
            <Chip
              label={translateStatusLabel(userInfo.status)}
              size="small"
              sx={{
                ...getStatusColor(userInfo.status),
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Missions Section */}
      {role === "admin" && parentComponent !== "reports" && (
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
