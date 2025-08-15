import { useTheme } from "@mui/material/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  SaveAlt as SaveAltIcon,
} from "@mui/icons-material";
import { handleDownload } from "#utils";

export const ReportEvidence = ({ reportDetails }: { reportDetails: any }) => {
  const theme = useTheme();

  const reportEvidence = reportDetails?.reportProof;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "20%" }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette.text.primary,
        }}
      >
        Evidence
      </Typography>
      <List disablePadding>
        <ListItem
          disablePadding
          sx={{
            p: theme.spacing(2),
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
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
            primary={"Evidence"}
            primaryTypographyProps={{
              fontSize: theme.typography.pxToRem(14),
              color: theme.palette.text.primary,
            }}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              onClick={() => handleDownload(reportEvidence)}
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
    </Box>
  );
};
