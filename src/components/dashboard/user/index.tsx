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

  // Memoize missions based on role
  const missions = useMemo(() => {
    if (role === "educator") {
      return userProfile?.missionsHiredFor || [];
    }
    return organizationMissions?.data || [];
  }, [role, userProfile?.missionsHiredFor, organizationMissions?.data]);

  // Memoize mission counts for better performance
  const missionCounts = useMemo(() => {
    const pending = missions.filter(
      (mission: any) => mission.status === "pending"
    ).length;
    const ongoing = missions.filter(
      (mission: any) => mission.status === "ongoing"
    ).length;
    const completed = missions.filter(
      (mission: any) => mission.status === "completed"
    ).length;

    const pendingInvitations =
      role === "educator"
        ? userProfile?.missionsInvitedFor?.filter(
            (mission: any) =>
              mission?.mission && mission.invitationStatus === "pending"
          ).length || 0
        : 0;

    return { pending, ongoing, completed, pendingInvitations };
  }, [missions, role, userProfile?.missionsInvitedFor]);

  const educatorMissions = useMemo(() => {
    return userProfile?.missionsHiredFor;
  }, [userProfile?.missionsHiredFor]);

  // Memoize KPIs with filtered items and calculated totals
  const kpis = useMemo(() => {
    const filteredKpis = defaultKpis.filter((kpi) => {
      if (role === "organization") return kpi.title !== "Pending Invitations";
      return kpi.title !== "Pending Missions";
    });

    return filteredKpis.map((kpi) => {
      switch (kpi.title) {
        case "Total Missions":
          return { ...kpi, total: role === "organization" ? organizationMissions?.total : educatorMissions?.length };
        case "Ongoing Missions":
          return { ...kpi, total: missionCounts.ongoing };
        case "Pending Invitations":
          return { ...kpi, total: missionCounts.pendingInvitations };
        case "Pending Missions":
          return { ...kpi, total: missionCounts.pending };
        case "Completed Missions":
          return { ...kpi, total: missionCounts.completed };
        default:
          return kpi;
      }
    });
  }, [role, organizationMissions?.total, missionCounts]);

  // Memoize tab missions
  const calendarTabMissions = useMemo(() => {
    if (role === "educator") {
      return (
        userProfile?.missionsInvitedFor?.map((elem: any) => elem.mission) || []
      );
    }
    return missions;
  }, [role, userProfile?.missionsInvitedFor, missions]);

  const missionsTabMissions = useMemo(() => {
    return role === "educator" ? userProfile?.missionsHiredFor || [] : missions;
  }, [role, userProfile?.missionsHiredFor, missions]);

  // Memoize tab view props
  const tabViewProps = useMemo(
    () => ({
      calendarTabMissions,
      missionsTabMissions: {
        missions: missionsTabMissions,
        refetchMissions: refetchOrganizationMissions,
      },
    }),
    [calendarTabMissions, missionsTabMissions, refetchOrganizationMissions]
  );

  if (role === "organization" && isLoadingOrganizationMissions) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <PageMeta title={title} description={description} />
      <KpiCards kpiCardsData={kpis} />
      <TabsView {...tabViewProps} />
    </>
  );
};
