import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  SaveAlt as SaveAltIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import { handleDownload } from "#lib";

export const Branches = ({ organizationData }: { organizationData: any }) => {
  const theme = useTheme();

  const branches = organizationData?.branches;

  const CardHeader = ({ title }: any) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: theme.spacing(2),
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
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader title="Branches" />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(4) }}>
        {branches?.map((branch: any, index: number) => (
          <Card
            sx={{
              width: "45%",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius,
              backgroundColor: theme.palette.background.default,
            }}
          >
            <CardContent sx={{ p: theme.spacing(3) }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: theme.typography.fontWeightMedium,
                  mb: theme.spacing(2),
                  fontSize: theme.typography.pxToRem(24),
                }}
              >
                {branch.branchName}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: theme.typography.fontWeightMedium,
                  display: "flex",
                  alignItems: "center",
                  mb: theme.spacing(1),
                }}
              >
                <PhoneIcon sx={{ mr: theme.spacing(1) }} /> {branch.branchPhone}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: theme.typography.fontWeightMedium,
                  display: "flex",
                  alignItems: "center",
                  mb: theme.spacing(1),
                }}
              >
                <EmailIcon sx={{ mr: theme.spacing(1) }} /> {branch.branchEmail}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: theme.typography.fontWeightMedium,
                  display: "flex",
                  alignItems: "center",
                  mb: theme.spacing(1),
                }}
              >
                <BusinessIcon sx={{ mr: theme.spacing(1) }} />{" "}
                {`${branch.branchCountry}, ${branch.branchCity}`}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: theme.typography.fontWeightMedium,
                  display: "flex",
                  alignItems: "center",
                  mb: theme.spacing(2),
                }}
              >
                <LocationOnIcon sx={{ mr: theme.spacing(1) }} />{" "}
                {branch.branchAddress}
              </Typography>

              <List disablePadding>
                <ListItem key={index} disablePadding>
                  <ListItemIcon sx={{ minWidth: theme.spacing(4.5) }}>
                    <DescriptionIcon
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: theme.typography.pxToRem(20),
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Residence Guidelines"
                    primaryTypographyProps={{
                      fontSize: theme.typography.pxToRem(14),
                      color: theme.palette.text.primary,
                    }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleDownload(branch.residenceGuidelines)}
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
              </List>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

Branches.displayName = "Branches";
