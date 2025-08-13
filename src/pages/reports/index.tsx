import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useUserContext } from "#context";
import { Theme, useTheme } from "@mui/material";

import {
  Assignment as AssignmentIcon,
  HourglassTop as HourglassTopIcon,
  CheckCircle as CheckCircleIcon,
  HighlightOff as HighlightOffIcon,
} from "@mui/icons-material";

import { KpiItem } from "#types";
import { KpiCards, PageMeta } from "#components";

const defaultKpis: KpiItem[] = [
  {
    title: "Total",
    total: 0,
    icon: <AssignmentIcon sx={{ color: "#1976d2", fontSize: "1.5rem" }} />, // Blue 700
    iconBg: "#e3f2fd", // Blue 50
  },
  {
    title: "Open",
    total: 0,
    icon: <HourglassTopIcon sx={{ color: "#ef6c00", fontSize: "1.5rem" }} />, // Orange 800 (slightly deeper for contrast)
    iconBg: "#fff3e0", // Orange 50
  },
  {
    title: "Resolved",
    total: 0,
    icon: <CheckCircleIcon sx={{ color: "#1b5e20", fontSize: "1.5rem" }} />, // Green 900 for max contrast
    iconBg: "#e8f5e9", // Green 50
  },
  {
    title: "Dismissed",
    total: 0,
    icon: <HighlightOffIcon sx={{ color: "#b71c1c", fontSize: "1.5rem" }} />, // Red 900 for max contrast
    iconBg: "#ffebee", // Red 50
  },
];

export const Reports = () => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      <PageMeta title="Manage Reports" description="Manage all reports here" />
      <KpiCards kpiCardsData={defaultKpis} />
    </>
  );
};
