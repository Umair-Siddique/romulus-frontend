import {
  Assignment,
  AssignmentTurnedIn,
  Cancel,
  HourglassBottom,
  WatchLater,
} from "@mui/icons-material";

export const kpiCardsData = [
  {
    title: "Total",
    total: 120,
    icon: <Assignment sx={{ color: "#1976d2", fontSize: "1.5rem" }} />,
    iconBg: "#e3f2fd",
  },
  {
    title: "Ongoing",
    total: 35,
    icon: <HourglassBottom sx={{ color: "#ff9800", fontSize: "1.5rem" }} />,
    iconBg: "#fff3e0",
  },
  {
    title: "Pending",
    total: 50,
    icon: <WatchLater sx={{ color: "#ffc107", fontSize: "1.5rem" }} />,
    iconBg: "#fff8e1",
  },
  {
    title: "Completed",
    total: 85,
    icon: <AssignmentTurnedIn sx={{ color: "#4caf50", fontSize: "1.5rem" }} />,
    iconBg: "#e8f5e9",
  },
  {
    title: "Cancelled",
    total: 15,
    icon: <Cancel sx={{ color: "#f44336", fontSize: "1.5rem" }} />,
    iconBg: "#ffebee",
  },
];
