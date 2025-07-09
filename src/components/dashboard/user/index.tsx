import {
  Assignment as AssignmentIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Cancel as CancelIcon,
  HourglassBottom as HourglassBottomIcon,
  WatchLater as WatchLaterIcon,
} from "@mui/icons-material";
import { useList } from "@refinedev/core";
import { useEffect, useState } from "react";

import { TabsView } from "./tabView";
import { KpiCards } from "./kpiCards";
import { PageMeta } from "../../page-meta";

import { KpiItem, UserDashboardProps } from "#types";

const defaultKpis: KpiItem[] = [
  {
    title: "Total",
    total: 0,
    icon: <AssignmentIcon sx={{ color: "#1976d2", fontSize: "1.5rem" }} />,
    iconBg: "#e3f2fd",
  },
  {
    title: "Ongoing",
    total: 0,
    icon: <HourglassBottomIcon sx={{ color: "#ff9800", fontSize: "1.5rem" }} />,
    iconBg: "#fff3e0",
  },
  {
    title: "Pending",
    total: 0,
    icon: <WatchLaterIcon sx={{ color: "#ffc107", fontSize: "1.5rem" }} />,
    iconBg: "#fff8e1",
  },
  {
    title: "Completed",
    total: 0,
    icon: (
      <AssignmentTurnedInIcon sx={{ color: "#4caf50", fontSize: "1.5rem" }} />
    ),
    iconBg: "#e8f5e9",
  },
  {
    title: "Cancelled",
    total: 0,
    icon: <CancelIcon sx={{ color: "#f44336", fontSize: "1.5rem" }} />,
    iconBg: "#ffebee",
  },
  {
    title: "Rejected",
    total: 0,
    icon: <CancelIcon sx={{ color: "#f44336", fontSize: "1.5rem" }} />,
    iconBg: "#ffebee",
  },
];

export const UserDashboard = ({
  role,
  title,
  description,
}: UserDashboardProps) => {
  const { data, isLoading, isError } = useList({
    resource: "missions",
  });

  const [kpis, setKpis] = useState<KpiItem[]>(
    defaultKpis.filter((kpi) => {
      if (role === "organization") return kpi.title !== "Rejected";
      return kpi.title !== "Cancelled";
    })
  );

  useEffect(() => {
    setKpis((prevKpis) =>
      prevKpis.map((kpi) => {
        switch (kpi.title) {
          case "Total":
            return { ...kpi, total: data?.total || 0 };
          case "Ongoing":
            return {
              ...kpi,
              total:
                data?.data.filter((mission) => mission.status === "ongoing")
                  .length || 0,
            };
          case "Pending":
            return {
              ...kpi,
              total:
                data?.data.filter((mission) => mission.status === "pending")
                  .length || 0,
            };
          case "Completed":
            return {
              ...kpi,
              total:
                data?.data.filter((mission) => mission.status === "completed")
                  .length || 0,
            };
          case "Cancelled":
            return {
              ...kpi,
              total:
                data?.data.filter((mission) => mission.status === "cancelled")
                  .length || 0,
            };
          case "Rejected":
            return {
              ...kpi,
              total:
                data?.data.filter((mission) => mission.status === "rejected")
                  .length || 0,
            };
          default:
            return kpi;
        }
      })
    );
  }, [data?.data]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <PageMeta title={title} description={description} />

      <KpiCards kpiCardsData={kpis} />

      <TabsView />
    </>
  );
};
