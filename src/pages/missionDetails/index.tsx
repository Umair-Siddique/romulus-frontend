import { getStatusColor } from "#utils/getStatusColor";
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
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { useOne } from "@refinedev/core";

import { useUserContext } from "#context";

export const MissionDetails = () => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();
  const { role, educatorId, organizationId } = user;

  const { data } = useOne({
    resource: `missions/${role}/${educatorId || organizationId}/one`,
    queryOptions: {
      enabled: true,
    },
  });

  const defaultMission = {
    title: "Science Fair Coordination",
    organizationName: "The Learning Hub",
    date: "12 May, 2025",
    time: "01:00 pm to 04:00 pm",
    branchName: "Downtown",
    location: "Aston, USA",
    address: "1456 Veltri Drive, Anchorage, AK 99502",
    status: "ongoing",
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

  return (
    <Box
      sx={{
        p: theme.spacing(3),
        mb: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.default,
        width: "100%",
      }}
    >
      {/* Mission Overview Text and Mission Acceptance Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: theme.spacing(2),
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.text.primary,
            mb: theme.spacing(3),
            display: "flex",
            alignItems: "center",
          }}
        >
          Mission Overview
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: theme.spacing(2) }}
        >
          <Button
            variant="outlined"
            color="error"
            sx={{
              borderRadius: theme.shape.borderRadius,
              px: theme.spacing(3),
              py: theme.spacing(1),
              fontWeight: theme.typography.fontWeightMedium,
              textTransform: "none",
              "&:hover": {
                backgroundColor: theme.palette.error.main + "0a",
              },
            }}
          >
            Reject Mission
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: theme.shape.borderRadius,
              px: theme.spacing(3),
              py: theme.spacing(1),
              fontWeight: theme.typography.fontWeightMedium,
              textTransform: "none",
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Accept Mission
          </Button>
        </Box>
      </Box>

      {/* Mission Information and Preferred Educator */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: theme.spacing(2),
        }}
      >
        {/* Mission Details */}
        <Box>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.text.primary,
              mb: theme.spacing(2),
            }}
          >
            {missionData.title}
          </Typography>

          <Stack spacing={theme.spacing(1.5)}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(2),
              }}
            >
              <Business sx={{ color: theme.palette.grey[600], fontSize: 20 }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  width: "105px",
                  fontWeight: theme.typography.fontWeightMedium,
                }}
              >
                Organization:
              </Typography>
              <Typography variant="body1" color="text.primary">
                {missionData.organizationName}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(2),
              }}
            >
              <CalendarToday
                sx={{ color: theme.palette.grey[600], fontSize: 20 }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  width: "105px",
                  fontWeight: theme.typography.fontWeightMedium,
                }}
              >
                Date:
              </Typography>
              <Typography variant="body1" color="text.primary">
                {missionData.date}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(2),
              }}
            >
              <AccessTime
                sx={{ color: theme.palette.grey[600], fontSize: 20 }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  width: "105px",
                  fontWeight: theme.typography.fontWeightMedium,
                }}
              >
                Time:
              </Typography>
              <Typography variant="body1" color="text.primary">
                {missionData.time}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(2),
              }}
            >
              <Business sx={{ color: theme.palette.grey[600], fontSize: 20 }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  width: "105px",
                  fontWeight: theme.typography.fontWeightMedium,
                }}
              >
                Branch Name:
              </Typography>
              <Typography variant="body1" color="text.primary">
                {missionData.branchName}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(2),
              }}
            >
              <LocationOn
                sx={{ color: theme.palette.grey[600], fontSize: 20 }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  width: "105px",
                  fontWeight: theme.typography.fontWeightMedium,
                }}
              >
                Location:
              </Typography>
              <Typography variant="body1" color="text.primary">
                {missionData.location}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(2),
              }}
            >
              <LocationOn
                sx={{ color: theme.palette.grey[600], fontSize: 20 }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  width: "105px",
                  fontWeight: theme.typography.fontWeightMedium,
                }}
              >
                Address:
              </Typography>
              <Typography variant="body1" color="text.primary">
                {missionData.address}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(2),
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  width: "105px",
                  fontWeight: theme.typography.fontWeightMedium,
                }}
              >
                Status:
              </Typography>
              <Chip
                label={missionData.status}
                size="small"
                sx={{
                  fontWeight: theme.typography.fontWeightMedium,
                  ...getStatusColor(missionData.status),
                }}
              />
            </Box>
          </Stack>
        </Box>

        {/* Preferred Educator Card */}
        <Box
          sx={{
            width: "300px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.text.primary,
              mb: theme.spacing(2),
            }}
          >
            Preferred Educator
          </Typography>

          {/* Educator Card */}
          <Card
            sx={{
              boxShadow: theme.shadows[2],
              borderRadius: theme.shape.borderRadius,
              width: "210px",
              height: "210px",
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                backgroundColor: theme.palette.background.default,
              }}
            >
              <Avatar
                src={missionData.educator.avatar}
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: theme.spacing(1),
                  border: `4px solid ${theme.palette.grey[200]}`,
                  boxShadow: theme.shadows[2],
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: theme.spacing(1),
                  mb: theme.spacing(1),
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.text.primary,
                  }}
                >
                  {missionData.educator.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: theme.spacing(0.5),
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: theme.typography.fontWeightMedium,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {missionData.educator.rating}
                  </Typography>
                  <Star
                    sx={{ color: theme.palette.warning.main, fontSize: 20 }}
                  />
                </Box>
              </Box>

              <Button
                variant="outlined"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  fontWeight: theme.typography.fontWeightMedium,
                  textTransform: "none",
                  px: theme.spacing(3),
                  "&:hover": {
                    borderColor: theme.palette.primary.dark,
                    backgroundColor: theme.palette.primary.main + "0a",
                  },
                }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Document Download Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: theme.spacing(2),
        }}
      >
        {missionData.document && (
          <Paper
            sx={{
              p: theme.spacing(2),
              backgroundColor: theme.palette.grey[50],
              border: `1px solid ${theme.palette.grey[200]}`,
              borderRadius: theme.shape.borderRadius,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: theme.spacing(2),
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing(2),
                }}
              >
                <Description sx={{ color: theme.palette.primary.main }} />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.text.primary,
                  }}
                >
                  {missionData.document.name}
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<Download />}
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  color: theme.palette.common.black,
                  backgroundColor: theme.palette.background.default,
                  fontWeight: theme.typography.fontWeightMedium,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: theme.palette.grey[100],
                  },
                }}
              >
                Download
              </Button>
            </Box>
          </Paper>
        )}
      </Box>

      {/* Contact Information Card */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: theme.spacing(2),
          backgroundColor: theme.palette.background.paper,
          p: theme.spacing(3),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[1],
        }}
      >
        <Stack spacing={theme.spacing(2)}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
              mb: theme.spacing(2),
              color: theme.palette.text.primary,
            }}
          >
            Organization Contact
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(2),
            }}
          >
            <Phone sx={{ color: theme.palette.grey[600], fontSize: 20 }} />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                minWidth: "60px",
                fontWeight: theme.typography.fontWeightMedium,
              }}
            >
              Phone:
            </Typography>
            <Typography variant="body1" color="text.primary">
              {missionData.contact.phone}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing(2),
            }}
          >
            <Email sx={{ color: theme.palette.grey[600], fontSize: 20 }} />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                minWidth: "60px",
                fontWeight: theme.typography.fontWeightMedium,
              }}
            >
              Email:
            </Typography>
            <Typography variant="body1" color="text.primary">
              {missionData.contact.email}
            </Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: theme.spacing(2),
          }}
        >
          <Button
            variant="contained"
            startIcon={<Message />}
            sx={{
              borderRadius: theme.shape.borderRadius,
              color: theme.palette.common.black,
              backgroundColor: theme.palette.background.default,
              fontWeight: theme.typography.fontWeightMedium,
              textTransform: "none",
              "&:hover": {
                backgroundColor: theme.palette.grey[100],
              },
            }}
          >
            Send Message
          </Button>
        </Box>
      </Box>

      {/* Document and Contact Information - Now using flexbox layout */}
      <Box
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          p: theme.spacing(2),
          mb: theme.spacing(3),
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
         variant="h6"
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
              mb: theme.spacing(2),
              color: theme.palette.text.primary,
            }}
        >
          Mission Description
        </Typography>
        <Typography
          variant="body1"
          sx={{
            lineHeight: theme.typography.body1.lineHeight,
            color: theme.palette.text.secondary,
            fontSize: theme.typography.body1.fontSize,
          }}
        >
          {missionData.description}
        </Typography>
      </Box>

      <Box
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          p: theme.spacing(2),
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: theme.typography.h2.fontWeight,
            mb: theme.spacing(2),
            color: theme.palette.text.primary,
          }}
        >
          Your Feedback
        </Typography>
      </Box>
    </Box>
  );
};
