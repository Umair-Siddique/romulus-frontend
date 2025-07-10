import { useUserContext } from "#context";
import {
  AccessTime,
  Business,
  CalendarToday,
  Description,
  Download,
  Email,
  LocationOn,
  Message,
  Phone,
  Star,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useOne } from "@refinedev/core";

export const MissionDetails = () => {
  const { user } = useUserContext();
  const { educatorId } = user;

  const { data } = useOne({
    resource: `missions/educator/${educatorId}/one`, // Use the extracted mission ID
    // id: missionId, // Use the extracted mission ID
    queryOptions: {
      enabled: true, // Adjust based on your data fetching logic
    },
  });

  const defaultMission = {
    title: "Science Fair Coordination",
    organizationName: "The Learning Hub",
    date: "12 May, 2025",
    time: "01:00 pm to 04:00 pm",
    branchName: "Downton",
    location: "Aston, USA",
    address: "1456 Veltri Drive, Anchorage, AK 99502",
    status: "New",
    description:
      "This session is designed to engage the educator in a dynamic spoken English activity that will involve a group of 20 enthusiastic students, specifically from grades 6 to 7. Prior to the session, a comprehensive worksheet will be distributed to ensure that all students are well-prepared and can actively participate in the discussions and exercises planned. It is essential for the educator to arrive at least 15 minutes ahead of the scheduled start time to set up the classroom environment and address any last-minute details. Additionally, the educator is expected to adhere to a semi-formal dress code, which will help create a professional yet approachable atmosphere conducive to learning.",
    document: {
      name: "Residence_guideline.pdf",
      url: "#",
    },
    contact: {
      phone: "(917) 339-6416",
      email: "dennis416@gmail.com",
    },
    educator: {
      name: "John Clark",
      rating: 4.6,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
  };

  const missionData = defaultMission;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "error";
      case "accepted":
        return "success";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Mission Overview
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            color="error"
            sx={{ borderRadius: 3, px: 3, py: 1 }}
          >
            Reject Mission
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1,
              backgroundColor: "#29B6F6",
              "&:hover": {
                backgroundColor: "#0288D1",
              },
            }}
          >
            Accept Mission
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Mission Title */}
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 600, mb: 3 }}
          >
            {missionData.title}
          </Typography>

          {/* Mission Details */}
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Business sx={{ color: "grey.600" }} />
              <Typography variant="body2" color="text.secondary">
                Organization:
              </Typography>
              <Typography variant="body1">
                {missionData.organizationName}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CalendarToday sx={{ color: "grey.600" }} />
              <Typography variant="body2" color="text.secondary">
                Date:
              </Typography>
              <Typography variant="body1">{missionData.date}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <AccessTime sx={{ color: "grey.600" }} />
              <Typography variant="body2" color="text.secondary">
                Time:
              </Typography>
              <Typography variant="body1">{missionData.time}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Business sx={{ color: "grey.600" }} />
              <Typography variant="body2" color="text.secondary">
                Branch Name:
              </Typography>
              <Typography variant="body1">{missionData.branchName}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <LocationOn sx={{ color: "grey.600" }} />
              <Typography variant="body2" color="text.secondary">
                Location:
              </Typography>
              <Typography variant="body1">{missionData.location}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <LocationOn sx={{ color: "grey.600" }} />
              <Typography variant="body2" color="text.secondary">
                Address:
              </Typography>
              <Typography variant="body1">{missionData.address}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Status:
              </Typography>
              <Chip
                label={missionData.status}
                color={getStatusColor(missionData.status)}
                size="small"
                sx={{ fontWeight: 500 }}
              />
            </Box>
          </Stack>

          {/* Document */}
          {missionData.document && (
            <Paper sx={{ p: 2, mb: 3, bgcolor: "grey.50" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Description sx={{ color: "primary.main" }} />
                  <Typography variant="body1">
                    {missionData.document.name}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  sx={{ borderRadius: 2 }}
                >
                  Download
                </Button>
              </Box>
            </Paper>
          )}

          {/* Organization Contact */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Organization Contact
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Phone sx={{ color: "grey.600" }} />
                  <Typography variant="body2" color="text.secondary">
                    Phone:
                  </Typography>
                  <Typography variant="body1">
                    {missionData.contact.phone}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Email sx={{ color: "grey.600" }} />
                  <Typography variant="body2" color="text.secondary">
                    Email:
                  </Typography>
                  <Typography variant="body1">
                    {missionData.contact.email}
                  </Typography>
                </Box>
              </Stack>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Message />}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "#424242",
                    "&:hover": {
                      backgroundColor: "#212121",
                    },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Mission Description */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Mission Description
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, color: "text.secondary" }}
            >
              {missionData.description}
            </Typography>
          </Box>
        </Grid>

        {/* Right Column - Preferred Educator */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: "sticky", top: 20 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Preferred Educator
              </Typography>

              <Avatar
                src={missionData.educator.avatar}
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: 2,
                  border: 4,
                  borderColor: "grey.200",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {missionData.educator.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {missionData.educator.rating}
                  </Typography>
                  <Star sx={{ color: "#FFD700", fontSize: 20 }} />
                </Box>
              </Box>

              <Button
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  borderColor: "#29B6F6",
                  color: "#29B6F6",
                  "&:hover": {
                    borderColor: "#0288D1",
                    backgroundColor: "rgba(41, 182, 246, 0.04)",
                  },
                }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
