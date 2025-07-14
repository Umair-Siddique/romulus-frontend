import { Avatar, Typography, Box, Chip, Grid, useTheme } from "@mui/material";

export const ProfileCard = () => {
  const theme = useTheme();

  const userInfo = {
    name: "John Doe",
    phone: "(303) 420-4261",
    email: "John.doe@example.com",
    gender: "Male",
    dob: "Apr 12, 2000",
    location: "New York, USA",
    status: "Pending",
    avatar: "/api/placeholder/120/120",
  };

  const missions = {
    total: 23,
    pending: 4,
    ongoing: 4,
    completed: 16,
    rejected: 3,
  };

  const missionItems = [
    { label: "Total:", value: missions.total },
    { label: "Pending:", value: missions.pending },
    { label: "Ongoing:", value: missions.ongoing },
    { label: "Completed:", value: missions.completed },
    { label: "Rejected:", value: missions.rejected },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Profile Avatar Section */}
        <Grid item xs={12} sm={3} md={2}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={userInfo.avatar}
              alt={userInfo.name}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: `3px solid ${theme.palette.primary.light}`,
                boxShadow: theme.shadows[3],
              }}
            />
          </Box>
        </Grid>

        {/* User Information Section */}
        <Grid item xs={12} sm={6} md={7}>
          <Box>
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
        </Grid>

        {/* Missions Section */}
        <Grid item xs={12} sm={3} md={3}>
          <Box>
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
        </Grid>
      </Grid>
    </Box>
  );
};

ProfileCard.displayName = "ProfileCard";
