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
import { getStatusColor } from "#utils/getStatusColor";

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

const data: Data[] = [
  {
    id: 1,
    name: "Emily Johnson",
    avatar: "/api/placeholder/40/40",
    responseTime: "May 8, 2025 - 10:15 AM",
    status: "Accepted",
  },
  {
    id: 2,
    name: "James Smith",
    avatar: "/api/placeholder/40/40",
    responseTime: "—",
    status: "Pending",
  },
  {
    id: 3,
    name: "Sophia Brown",
    avatar: "/api/placeholder/40/40",
    responseTime: "May 8, 2025 - 9:45 AM",
    status: "Rejected",
  },
  {
    id: 4,
    name: "Liam Davis",
    avatar: "/api/placeholder/40/40",
    responseTime: "—",
    status: "Pending",
  },
  {
    id: 5,
    name: "Olivia Wilson",
    avatar: "/api/placeholder/40/40",
    responseTime: "May 8, 2025 - 9:45 AM",
    status: "Rejected",
  },
  {
    id: 6,
    name: "Noah Taylor",
    avatar: "/api/placeholder/40/40",
    responseTime: "—",
    status: "Pending",
  },
  {
    id: 7,
    name: "Ava Martinez",
    avatar: "/api/placeholder/40/40",
    responseTime: "May 8, 2025 - 9:45 AM",
    status: "Accepted",
  },
  {
    id: 8,
    name: "Mason Anderson",
    avatar: "/api/placeholder/40/40",
    responseTime: "—",
    status: "Pending",
  },
  {
    id: 9,
    name: "Isabella Thomas",
    avatar: "/api/placeholder/40/40",
    responseTime: "May 8, 2025 - 9:45 AM",
    status: "Rejected",
  },
  {
    id: 10,
    name: "Ethan Jackson",
    avatar: "/api/placeholder/40/40",
    responseTime: "—",
    status: "Pending",
  },

];

export const EducatorTable = () => {
  const theme = useTheme<Theme>();

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
