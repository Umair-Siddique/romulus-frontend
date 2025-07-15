import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { RemoveRedEye as EyeIcon } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { formatDate, formatTime, getStatusColor } from "#utils";
import { useMany } from "@refinedev/core";

interface Data {
  id: number;
  name: string;
  avatar: string;
  responseTime: string;
  status: string;
}

// Fixed column widths
const COLUMN_WIDTHS = {
  educator: 150,
  responseTime: 200,
  status: 150,
  actions: 150,
};

// Common table header component
const TableHeader = ({ theme }: { theme: Theme }) => (
  <TableHead>
    <TableRow
      sx={{
        backgroundColor: theme.palette.grey[50],
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          borderBottom: `1px solid ${theme.palette.divider}`,
          width: COLUMN_WIDTHS.educator,
          minWidth: COLUMN_WIDTHS.educator,
        }}
      >
        Educator
      </TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          width: COLUMN_WIDTHS.responseTime,
          minWidth: COLUMN_WIDTHS.responseTime,
        }}
      >
        Response Time
      </TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          width: COLUMN_WIDTHS.status,
          minWidth: COLUMN_WIDTHS.status,
        }}
      >
        Status
      </TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          width: COLUMN_WIDTHS.actions,
          minWidth: COLUMN_WIDTHS.actions,
        }}
      >
        Actions
      </TableCell>
    </TableRow>
  </TableHead>
);

export const EducatorTable = ({
  educators,
  missionId,
}: {
  educators: string[];
  missionId: string;
}) => {
  const theme = useTheme<Theme>();
  const navigate = useNavigate();

  // Use useMany instead of multiple useOne calls
  const { data: educatorsData, isLoading } = useMany({
    resource: "educators",
    ids: educators,
    queryOptions: {
      enabled: educators.length > 0,
    },
  });

  // Early return if no educators provided
  if (!educators || educators.length === 0) {
    return (
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
            <TableHeader theme={theme} />
            <TableBody>
              <TableRow
                sx={{
                  backgroundColor: theme.palette.background.default,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <TableCell
                  colSpan={4}
                  sx={{
                    textAlign: "center",
                    padding: theme.spacing(3),
                    width: "100%",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No educators found
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
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
            <TableHeader theme={theme} />
            <TableBody>
              <TableRow
                sx={{
                  backgroundColor: theme.palette.background.default,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <TableCell
                  colSpan={4}
                  sx={{
                    textAlign: "center",
                    padding: theme.spacing(3),
                    width: "100%",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Loading educators...
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  const data: Data[] =
    educatorsData?.data
      ?.map((educator: any) => ({
        id: educator?._id,
        name:
          `${educator?.firstName} ${educator?.lastName}` || "Unknown Educator",
        avatar: educator?.avatar || "/api/placeholder/40/40",
        responseTime: educator?.missionsInvitedFor?.find(
          (mission: any) => mission?.mission?._id === missionId
        )?.responseTime
          ? `${formatDate(
              educator?.missionsInvitedFor
                ?.find((mission: any) => mission?.mission?._id === missionId)
                ?.responseTime?.split("T")[0]
            )} - ${formatTime(
              educator?.missionsInvitedFor
                ?.find((mission: any) => mission?.mission?._id === missionId)
                ?.responseTime?.split("T")[1]
                .split(".")[0]
            )}`
          : "—",
        status:
          educator?.missionsInvitedFor?.find(
            (mission: any) => mission?.mission?._id === missionId
          )?.invitationStatus || "Status Unavailable",
      }))
      .filter((educator) => educator.id) || []; // Filter out educators without valid IDs

  const handleViewEducator = (educatorId: number) => {
    navigate(`/educators/${educatorId}`, {
      state: { missionId },
    });
  };

  return (
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
          <TableHeader theme={theme} />
          <TableBody>
            {data.map((educator) => (
              <TableRow
                key={educator.id}
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
                    width: COLUMN_WIDTHS.educator,
                    minWidth: COLUMN_WIDTHS.educator,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: theme.spacing(2),
                    }}
                  >
                    <Avatar
                      src={educator.avatar}
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                      }}
                    >
                      {educator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: theme.typography.fontWeightMedium,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {educator.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    padding: theme.spacing(2),
                    width: COLUMN_WIDTHS.responseTime,
                    minWidth: COLUMN_WIDTHS.responseTime,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {educator.responseTime}
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
                    label={educator.status}
                    size="small"
                    sx={{
                      ...getStatusColor(educator.status),
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
                    onClick={() => handleViewEducator(educator.id)}
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
  );
};
