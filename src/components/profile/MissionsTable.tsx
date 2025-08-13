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

interface Data {
  id: number;
  missionTitle: string;
  createdOn: string;
  organizationName: string;
  branchName: string;
  status: string;
}

// Fixed column widths
const COLUMN_WIDTHS = {
  missionTitle: 200,
  createdOn: 200,
  organizationName: 200,
  branchName: 200,
  status: 150,
  actions: 150,
};

export const MissionsTable = ({ missions }: { missions: Data[] }) => {
  const theme = useTheme<Theme>();
  const navigate = useNavigate();

  const handleViewMission = (missionId: number) => {
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
              {missions?.map((mission: Data) => (
                <TableRow
                  key={mission.id}
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
                      width: COLUMN_WIDTHS.missionTitle,
                      minWidth: COLUMN_WIDTHS.missionTitle,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {mission.missionTitle}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      padding: theme.spacing(2),
                      width: COLUMN_WIDTHS.createdOn,
                      minWidth: COLUMN_WIDTHS.createdOn,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {formatDate(mission.createdOn)}
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
                      {mission.organizationName}
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
                      {mission.branchName}
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
                      onClick={() => handleViewMission(mission.id)}
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
