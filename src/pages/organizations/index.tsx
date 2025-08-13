import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useUserContext } from "#context";
import { Theme, useTheme } from "@mui/material";

import {
  Groups as GroupsIcon,
  HourglassTop as HourglassTopIcon,
  CheckCircle as CheckCircleIcon,
  HighlightOff as HighlightOffIcon,
} from "@mui/icons-material";

import { KpiItem } from "#types";
import { KpiCards, PageMeta, Table } from "#components";

const defaultKpis: KpiItem[] = [
  {
    title: "Total",
    total: 0,
    icon: <GroupsIcon sx={{ color: "#1976d2", fontSize: "1.5rem" }} />, // Blue 700
    iconBg: "#e3f2fd", // Blue 50
  },
  {
    title: "Pending",
    total: 0,
    icon: <HourglassTopIcon sx={{ color: "#f57c00", fontSize: "1.5rem" }} />, // Orange 700
    iconBg: "#fff3e0", // Orange 50
  },
  {
    title: "Active",
    total: 0,
    icon: <CheckCircleIcon sx={{ color: "#2e7d32", fontSize: "1.5rem" }} />, // Green 800
    iconBg: "#e8f5e9", // Green 50
  },
  {
    title: "Inactive",
    total: 0,
    icon: <HighlightOffIcon sx={{ color: "#c62828", fontSize: "1.5rem" }} />, // Red 800
    iconBg: "#ffebee", // Red 50
  },
];

export const Organizations = () => {
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
      <PageMeta
        title="Manage Organizations"
        description="Manage all organizations here"
      />
      <KpiCards kpiCardsData={defaultKpis} />
      <Table />
    </>
  );
};
