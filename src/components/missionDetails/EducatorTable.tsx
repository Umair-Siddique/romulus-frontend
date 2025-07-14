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

interface Column {
  id: "educator" | "responseTime" | "status" | "actions";
  label: string;
  minWidth?: number;
  format?: (value: any) => string;
}

const columns: Column[] = [
  {
    id: "educator",
    label: "Educator",
    minWidth: 170,
    format: (value) => value,
  },
  {
    id: "responseTime",
    label: "Response Time",
    minWidth: 130,
    format: (value) => value,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    format: (value) => value,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    format: (value) => value,
  },
];

interface Data {
  id: number;
  name: string;
  avatar: string;
  responseTime: string;
  status: string;
}

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
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: theme.palette.grey[50],
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.text.primary,
                    padding: theme.spacing(2),
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  Educator
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.text.primary,
                    padding: theme.spacing(2),
                  }}
                >
                  Response Time
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.text.primary,
                    padding: theme.spacing(2),
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.text.primary,
                    padding: theme.spacing(2),
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={4}
                  sx={{ textAlign: "center", padding: theme.spacing(3) }}
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
          padding: theme.spacing(3),
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Loading educators...
        </Typography>
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
        responseTime:
          `${formatDate(
            educator?.missionsInvitedFor?.find(
              (mission: any) => mission?.mission?._id === missionId
            )?.responseTime.split("T")[0]
          )} - ${formatTime(
            educator?.missionsInvitedFor?.find(
              (mission: any) => mission?.mission?._id === missionId
            )?.responseTime.split("T")[1].split(".")[0]
          )}` || "—",
        status:
          educator?.missionsInvitedFor?.find(
            (mission: any) => mission?.mission?._id === missionId
          )?.invitationStatus || "Status Unavailable",
      }))
      .filter((educator) => educator.id) || []; // Filter out educators without valid IDs

  const handleViewEducator = (educatorId: number) => {
    navigate(`/educators/${educatorId}`);
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
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: theme.palette.grey[50],
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <TableCell
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  color: theme.palette.text.primary,
                  padding: theme.spacing(2),
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                Educator
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  color: theme.palette.text.primary,
                  padding: theme.spacing(2),
                }}
              >
                Response Time
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  color: theme.palette.text.primary,
                  padding: theme.spacing(2),
                }}
              >
                Status
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  color: theme.palette.text.primary,
                  padding: theme.spacing(2),
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
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
                <TableCell sx={{ padding: theme.spacing(2) }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
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
                <TableCell sx={{ padding: theme.spacing(2) }}>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {educator.responseTime}
                  </Typography>
                </TableCell>
                <TableCell sx={{ padding: theme.spacing(2) }}>
                  <Chip
                    label={educator.status}
                    size="small"
                    sx={{
                      ...getStatusColor(educator.status),
                      fontWeight: theme.typography.fontWeightMedium,
                    }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ padding: theme.spacing(2) }}>
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
