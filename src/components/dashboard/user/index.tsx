import {
  Assignment as AssignmentIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  HourglassBottom as HourglassBottomIcon,
  WatchLater as WatchLaterIcon,
} from "@mui/icons-material";
import { useList } from "@refinedev/core";
import { useMemo } from "react";

import { TabsView } from "./tab-view";
import { KpiCards } from "./kpi-cards";
import { PageMeta } from "../../page-meta";

import { KpiItem, UserDashboardProps } from "#types";
import { useUserContext } from "#context";

const defaultKpis: KpiItem[] = [
  {
    title: "Total Missions",
    total: 0,
    icon: <AssignmentIcon sx={{ color: "#1976d2", fontSize: "1.5rem" }} />,
    iconBg: "#e3f2fd",
  },
  {
    title: `Pending Invitations`,
    total: 0,
    icon: <WatchLaterIcon sx={{ color: "#ffc107", fontSize: "1.5rem" }} />,
    iconBg: "#fff8e1",
  },
  {
    title: `Pending Missions`,
    total: 0,
    icon: <WatchLaterIcon sx={{ color: "#ffc107", fontSize: "1.5rem" }} />,
    iconBg: "#fff8e1",
  },
  {
    title: "Ongoing Missions",
    total: 0,
    icon: <HourglassBottomIcon sx={{ color: "#ff9800", fontSize: "1.5rem" }} />,
    iconBg: "#fff3e0",
  },
  {
    title: "Completed Missions",
    total: 0,
    icon: (
      <AssignmentTurnedInIcon sx={{ color: "#4caf50", fontSize: "1.5rem" }} />
    ),
    iconBg: "#e8f5e9",
  },
];

// Optimized mission filtering function
const getMissionCounts = (missions: any[], pendingInvitations: number = 0) => {
  const counts = {
    pending: 0,
    ongoing: 0,
    completed: 0,
    pendingInvitations,
  };

  // Single pass through missions array
  for (const mission of missions) {
    switch (mission.status) {
      case "pending":
        counts.pending++;
        break;
      case "ongoing":
        counts.ongoing++;
        break;
      case "completed":
        counts.completed++;
        break;
    }
  }

  return counts;
};

// Optimized KPI filtering and mapping
const getFilteredKpis = (role: string, missionCounts: any, totalMissions: number) => {
  const kpiTitleMap = {
    "Total Missions": totalMissions,
    "Ongoing Missions": missionCounts.ongoing,
    "Pending Invitations": missionCounts.pendingInvitations,
    "Pending Missions": missionCounts.pending,
    "Completed Missions": missionCounts.completed,
  };

  return defaultKpis
    .filter((kpi) => {
      if (role === "organization") return kpi.title !== "Pending Invitations";
      return kpi.title !== "Pending Missions";
    })
    .map((kpi) => ({
      ...kpi,
      total: kpiTitleMap[kpi.title as keyof typeof kpiTitleMap] || 0,
    }));
};

export const UserDashboard = ({
  role,
  organizationId,
  title,
  description,
}: UserDashboardProps) => {
  const { userProfile } = useUserContext();

  const {
    data: organizationMissions,
    isLoading: isLoadingOrganizationMissions,
    isError,
    refetch: refetchOrganizationMissions,
  } = useList({
    resource: `missions/organization/${organizationId}`,
    queryOptions: {
      enabled: role === "organization",
    },
  });

  // Optimized missions selection
  const missions = useMemo(() => {
    return role === "educator" 
      ? userProfile?.missionsHiredFor || []
      : organizationMissions?.data || [];
  }, [role, userProfile?.missionsHiredFor, organizationMissions?.data]);

  // Optimized mission counts calculation
  const missionCounts = useMemo(() => {
    const pendingInvitations = role === "educator"
      ? userProfile?.missionsInvitedFor?.filter(
          (mission: any) => mission?.mission && mission.invitationStatus === "pending"
        ).length || 0
      : 0;

    return getMissionCounts(missions, pendingInvitations);
  }, [missions, role, userProfile?.missionsInvitedFor]);

  // Optimized KPIs calculation
  const kpis = useMemo(() => {
    const totalMissions = role === "organization" 
      ? organizationMissions?.total || 0
      : userProfile?.missionsHiredFor?.length || 0;

    return getFilteredKpis(role!, missionCounts, totalMissions);
  }, [role, organizationMissions?.total, userProfile?.missionsHiredFor?.length, missionCounts]);

  // Optimized tab missions
  const tabMissions = useMemo(() => {
    const calendarTabMissions = role === "educator"
      ? userProfile?.missionsInvitedFor?.map((elem: any) => elem.mission) || []
      : missions;

    const missionsTabMissions = role === "educator" 
      ? userProfile?.missionsHiredFor || []
      : missions;

    return {
      calendarTabMissions,
      missionsTabMissions: {
        missions: missionsTabMissions,
        refetchMissions: refetchOrganizationMissions,
      },
    };
  }, [role, userProfile?.missionsInvitedFor, userProfile?.missionsHiredFor, missions, refetchOrganizationMissions]);

  if (role === "organization" && isLoadingOrganizationMissions) {
    return <div>Loading...</div>;
  } 
  
  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <PageMeta title={title} description={description} />
      <KpiCards kpiCardsData={kpis} />
      <TabsView {...tabMissions} />
    </>
  );
};