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
  Description as DescriptionIcon,
  SaveAlt as SaveAltIcon,
} from "@mui/icons-material";
import { useUserContext } from "#context";
import { handleDownload } from "#utils";

export const ProfessionalDetails = ({
  educatorData,
}: {
  educatorData: any;
}) => {
  const theme = useTheme();

  const userContext = useUserContext();
  const user = userContext?.user;
  const role = user?.role;

  const professionData = {
    title: educatorData?.profession || "Profession Unavailable",
    hourlyRate: `$${educatorData?.hourlyRate}/hr` || "Hourly Rate Unavailable",
    skills: educatorData?.skills || [],
    education: educatorData?.education || "Bachelor's in Education",
    certificates: [
      {
        name: "Certificate Of Honorability",
        url: educatorData?.certificateOfHonor,
      },
      { name: "Diploma", url: educatorData?.diploma },
    ],
  };

  const documentData = {
    documents: [
      {
        name: "Identity Proof",
        url: educatorData?.identityProof,
      },
      {
        name: "Criminal Record",
        url: educatorData?.criminalRecord,
      },
    ],
  };

  const handleEdit = (section: any) => {
    console.log(`Editing ${section}`);
  };

  const CardHeader = ({ title, onEdit }: any) => (
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
          color: theme.palette.text.secondary,
          fontWeight: theme.typography.fontWeightMedium,
          fontSize: theme.typography.pxToRem(16),
        }}
      >
        {title}
      </Typography>
      {role === "admin" && (
        <Button
          startIcon={<EditIcon />}
          onClick={onEdit}
          sx={{
            color: theme.palette.text.secondary,
            textTransform: "none",
            fontSize: theme.typography.pxToRem(14),
            fontWeight: theme.typography.fontWeightRegular,
            "&:hover": {
              backgroundColor: theme.palette.grey[50],
            },
          }}
        >
          Edit
        </Button>
      )}
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
          width: "50%",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CardContent sx={{ p: theme.spacing(3) }}>
          <CardHeader
            title="Profession & Skills"
            onEdit={() => handleEdit("profession")}
          />

          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
              mb: theme.spacing(1),
              fontSize: theme.typography.pxToRem(24),
            }}
          >
            {professionData.title}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: theme.typography.fontWeightMedium,
              mb: theme.spacing(3),
              fontSize: theme.typography.pxToRem(20),
            }}
          >
            {professionData.hourlyRate}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: theme.typography.fontWeightMedium,
              mb: theme.spacing(1.5),
            }}
          >
            Skills
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: theme.spacing(1),
              mb: theme.spacing(3),
            }}
          >
            {professionData.skills.map((skill: string, index: any) => (
              <Chip
                key={index}
                label={skill}
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: theme.palette.grey[50],
                  borderColor: theme.palette.grey[300],
                  fontSize: theme.typography.pxToRem(13),
                }}
              />
            ))}
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: theme.typography.fontWeightMedium,
              mb: theme.spacing(1.5),
            }}
          >
            Education
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
              mb: theme.spacing(2),
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
                    index < professionData.certificates.length - 1
                      ? `1px solid ${theme.palette.divider}`
                      : 0,
                  py: theme.spacing(1),
                }}
              >
                <ListItemIcon sx={{ minWidth: theme.spacing(4.5) }}>
                  <DescriptionIcon
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: theme.typography.pxToRem(20),
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={cert.name}
                  primaryTypographyProps={{
                    fontSize: theme.typography.pxToRem(14),
                    color: theme.palette.text.primary,
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleDownload(cert.url)}
                    sx={{
                      color: theme.palette.text.secondary,
                      "&:hover": {
                        backgroundColor: theme.palette.grey[50],
                      },
                    }}
                  >
                    <SaveAltIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Document Identity Card */}
      {role === "admin" && (
        <Card
          sx={{
            width: "50%",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <CardContent sx={{ p: theme.spacing(3) }}>
            <CardHeader
              title="Document Identity"
              onEdit={() => handleEdit("documents")}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                // gap: theme.spacing(5),
              }}
            >
              {documentData.documents.map((doc, index) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={{
                    p: theme.spacing(3),
                    textAlign: "center",
                    backgroundColor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.grey[300]}`,
                    borderRadius: theme.shape.borderRadius,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: theme.spacing(30),
                    width: theme.spacing(30),
                  }}
                >
                  <Box
                    sx={{
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: theme.shape.borderRadius,
                      width: theme.spacing(8),
                      height: theme.spacing(8),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DescriptionIcon
                      sx={{
                        fontSize: theme.typography.pxToRem(48),
                        color: theme.palette.primary.main,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: theme.typography.fontWeightMedium,
                      mb: theme.spacing(2),
                      color: theme.palette.text.primary,
                    }}
                  >
                    {doc.name}
                  </Typography>

                  <Button
                    variant="outlined"
                    startIcon={<SaveAltIcon />}
                    onClick={() => handleDownload(doc.url)}
                    sx={{
                      textTransform: "none",
                      fontWeight: theme.typography.fontWeightMedium,
                      borderColor: theme.palette.grey[300],
                      color: theme.palette.text.primary,
                      "&:hover": {
                        backgroundColor: theme.palette.grey[100],
                        borderColor: theme.palette.primary.main,
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
      )}
    </Box>
  );
};

ProfessionalDetails.displayName = "ProfessionalDetails";
