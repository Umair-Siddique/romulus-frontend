import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Chip,
  IconButton,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { RemoveRedEye as EyeIcon } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { formatDate, getStatusColor } from "#utils";
import TableHeader from "./TableHeader";

// Fixed column widths
const COLUMN_WIDTHS = {
  title: 200,
  createdAt: 200,
  organizationName: 200,
  branchName: 200,
  status: 150,
  actions: 150,
};

export const MissionsTable = ({ missions }: { missions: any[] }) => {
  const theme = useTheme<Theme>();
  const navigate = useNavigate();

  const handleViewMission = (missionId: string) => {
    navigate(`/missions/${missionId}`, {
      state: { missionId },
    });
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.default,
          borderRadius: theme.shape.borderRadius,
          overflow: "hidden",
        }}
      >
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ width: "100%", tableLayout: "fixed" }}>
            <TableHeader theme={theme} COLUMN_WIDTHS={COLUMN_WIDTHS} />
            <TableBody>
              {missions?.map((mission: any) => (
                <TableRow
                  key={mission._id}
                  hover
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      padding: theme.spacing(2),
                      width: COLUMN_WIDTHS.title,
                      minWidth: COLUMN_WIDTHS.title,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {mission.title}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      padding: theme.spacing(2),
                      width: COLUMN_WIDTHS.createdAt,
                      minWidth: COLUMN_WIDTHS.createdAt,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {formatDate(mission.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      padding: theme.spacing(2),
                      width: COLUMN_WIDTHS.organizationName,
                      minWidth: COLUMN_WIDTHS.organizationName,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {mission.organization.organizationName}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      padding: theme.spacing(2),
                      width: COLUMN_WIDTHS.branchName,
                      minWidth: COLUMN_WIDTHS.branchName,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {mission.branch}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      padding: theme.spacing(2),
                      width: COLUMN_WIDTHS.status,
                      minWidth: COLUMN_WIDTHS.status,
                    }}
                  >
                    <Chip
                      label={mission.status}
                      size="small"
                      sx={{
                        ...getStatusColor(mission.status),
                        fontWeight: theme.typography.fontWeightMedium,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      padding: theme.spacing(2),
                      width: COLUMN_WIDTHS.actions,
                      minWidth: COLUMN_WIDTHS.actions,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleViewMission(mission._id)}
                      sx={{
                        color: theme.palette.text.secondary,
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      <EyeIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
