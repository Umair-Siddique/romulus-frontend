import React from "react";
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
  ThemeProvider,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { RemoveRedEye as EyeIcon } from "@mui/icons-material";
import { getStatusColor } from "#utils/getStatusColor";

interface Column {
  id: "educator" | "responseTime" | "status" | "actions";
  label: string;
  minWidth?: number;
  align?: "right";
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
    align: "right",
    format: (value) => value,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "right",
    format: (value) => value,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "right",
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
];

export const EducatorTable = () => {
  const theme = useTheme<Theme>();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", backgroundColor: "#fff" }}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Educator</TableCell>
                <TableCell>Response Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((educator) => (
                <TableRow key={educator.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        src={educator.avatar}
                        sx={{ width: 40, height: 40 }}
                      >
                        {educator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                      <Typography variant="body1" fontWeight={500}>
                        {educator.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {educator.responseTime}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={educator.status}
                      size="small"
                      sx={{ ...getStatusColor(educator.status) }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" sx={{ color: "text.secondary" }}>
                      <EyeIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
};
