import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
  Paper,
} from "@mui/material";
import {
  Edit as EditIcon,
  Download as DownloadIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";

export const ProfessionalDetails = () => {
  const theme = useTheme();

  const professionData = {
    title: "Teacher",
    hourlyRate: "$12/hr",
    skills: ["Math", "Science", "Language Teaching"],
    education: "Bachelor's in Education",
    certificates: [
      { name: "Degree Certificate.pdf" },
      { name: "Teaching Certificate.pdf" },
    ],
  };

  const documentData = {
    documents: [
      { name: "Certificate of Honorability.pdf" },
      { name: "Residence_guideline.pdf" },
    ],
  };

  const handleDownload = (filename) => {
    console.log(`Downloading ${filename}`);
  };

  const handleEdit = (section) => {
    console.log(`Editing ${section}`);
  };

  const CardHeader = ({ title, onEdit }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        component="h3"
        sx={{
          color: "text.secondary",
          fontWeight: 500,
          fontSize: "1rem",
        }}
      >
        {title}
      </Typography>
      <Button
        startIcon={<EditIcon />}
        onClick={onEdit}
        sx={{
          color: "text.secondary",
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: 400,
          "&:hover": {
            backgroundColor: "grey.50",
          },
        }}
      >
        Edit
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: theme.spacing(8),
      }}
    >
      {/* Profession & Skills Card */}
      <Card
        sx={{
          width: "100%",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: "background.default",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <CardHeader
            title="Profession & Skills"
            onEdit={() => handleEdit("profession")}
          />

          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              mb: 1,
              fontSize: "1.5rem",
            }}
          >
            {professionData.title}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "primary.main",
              fontWeight: 500,
              mb: 3,
              fontSize: "1.25rem",
            }}
          >
            {professionData.hourlyRate}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              mb: 1.5,
            }}
          >
            Skills
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {professionData.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "grey.50",
                  borderColor: "grey.300",
                  fontSize: "0.8125rem",
                }}
              />
            ))}
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              mb: 1.5,
            }}
          >
            Education
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              mb: 2,
            }}
          >
            {professionData.education}
          </Typography>

          <List disablePadding>
            {professionData.certificates.map((cert, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  borderBottom:
                    index < professionData.certificates.length - 1 ? 1 : 0,
                  borderColor: "divider",
                  py: 1,
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <DescriptionIcon
                    sx={{
                      color: "primary.main",
                      fontSize: "1.25rem",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={cert.name}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    color: "text.primary",
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleDownload(cert.name)}
                    sx={{
                      color: "text.secondary",
                      "&:hover": {
                        backgroundColor: "grey.50",
                      },
                    }}
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Document Identity Card */}
      <Card
        sx={{
          width: "100%",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: "background.default",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <CardHeader
            title="Document Identity"
            onEdit={() => handleEdit("documents")}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            {documentData.documents.map((doc, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{
                  p: 3,
                  textAlign: "center",
                  backgroundColor: "grey.50",
                  border: "2px dashed",
                  borderColor: "grey.300",
                  borderRadius: 1,
                }}
              >
                <DescriptionIcon
                  sx={{
                    fontSize: "3rem",
                    color: "primary.main",
                    mb: 1.5,
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    mb: 2,
                    color: "text.primary",
                  }}
                >
                  {doc.name}
                </Typography>

                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleDownload(doc.name)}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    borderColor: "grey.300",
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "grey.100",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  Download
                </Button>
              </Paper>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

ProfessionalDetails.displayName = "ProfessionalDetails";
