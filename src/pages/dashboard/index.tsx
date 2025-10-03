import { useList } from "@refinedev/core";
import {
  AssignmentOutlined as AssignmentIcon,
  AssignmentTurnedInOutlined as AssignmentTurnedInIcon,
  HourglassBottomOutlined as HourglassBottomIcon,
  HourglassTopOutlined as HourglassTopIcon,
  CalendarTodayOutlined as CalendarIcon,
} from "@mui/icons-material";

import { KpiCards, PageMeta, TabsHorizontal } from "#components";

import { KpiItem } from "#types";
import { useUserContext } from "#context";
import { CalendarTab, MissionsTab } from "#components/dashboard";

const defaultKpis: KpiItem[] = [
  {
    title: "Total Missions",
    total: 0,
    icon: <AssignmentIcon sx={{ color: "#1976d2", fontSize: "1.5rem" }} />, // Blue 700
    iconBg: "#e3f2fd", // Blue 50
  },
  {
    title: "Pending Invitations",
    total: 0,
    icon: <HourglassTopIcon sx={{ color: "#f57c00", fontSize: "1.5rem" }} />, // Orange 700
    iconBg: "#fff3e0", // Orange 50
  },
  {
    title: "Pending Missions",
    total: 0,
    icon: <HourglassTopIcon sx={{ color: "#f57c00", fontSize: "1.5rem" }} />, // Orange 700
    iconBg: "#fff3e0", // Orange 50
  },
  {
    title: "Ongoing Missions",
    total: 0,
    icon: <HourglassBottomIcon sx={{ color: "#0288d1", fontSize: "1.5rem" }} />, // Light Blue 700
    iconBg: "#e1f5fe", // Light Blue 50
  },
  {
    title: "Completed Missions",
    total: 0,
    icon: (
      <AssignmentTurnedInIcon sx={{ color: "#2e7d32", fontSize: "1.5rem" }} />
    ), // Green 800
    iconBg: "#e8f5e9", // Green 50
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
const getFilteredKpis = (
  role: string,
  missionCounts: any,
  totalMissions: number
) => {
  const kpiTitleMap = {
    "Total Missions": totalMissions,
    "Ongoing Missions": missionCounts.ongoing,
    "Pending Invitations": missionCounts.pendingInvitations,
    "Pending Missions": missionCounts.pending,
    "Completed Missions": missionCounts.completed,
  };

  return defaultKpis
    .filter((kpi) => {
      if (role === "organization" || role === "admin")
        return kpi.title !== "Pending Invitations";
      return kpi.title !== "Pending Missions";
    })
    .map((kpi) => ({
      ...kpi,
      total: kpiTitleMap[kpi.title as keyof typeof kpiTitleMap] || 0,
    }));
};

export const Dashboard = () => {
  const { userProfile, user } = useUserContext();

  const { role, organizationId } = user;

  const { data: missionsData, refetch: refetchMissionsData } = useList({
    resource:
      role === "organization"
        ? `missions/organization/${organizationId}`
        : `missions`,
    queryOptions: {
      enabled: role === "organization" || role === "admin",
    },
  });

  const missions =
    role === "educator"
      ? userProfile?.missionsHiredFor || []
      : missionsData?.data || [];

  const pendingInvitations =
    role === "educator"
      ? userProfile?.missionsInvitedFor?.filter(
          (mission: any) =>
            mission?.mission && mission.invitationStatus === "pending"
        ).length || 0
      : 0;

  const missionCounts = getMissionCounts(missions, pendingInvitations);

  const totalMissions =
    role === "educator"
      ? [
          ...(userProfile?.missionsInvitedFor?.map(
            (mission: any) => mission.mission
          ) ?? []),
          ...(userProfile?.missionsHiredFor ?? []),
        ].filter(
          (mission: any, index: number, self: any) =>
            self.findIndex((t: any) => t?._id === mission?._id) === index
        )?.length
      : missionsData?.total || 0;

  const kpis = getFilteredKpis(role!, missionCounts, totalMissions!);

  const calendarTabMissions =
    role === "educator"
      ? userProfile?.missionsInvitedFor?.map((elem: any) => elem.mission) ?? []
      : missions;

  const mergedMissions = [
    ...(userProfile?.missionsHiredFor ?? []),
    ...(userProfile?.missionsInvitedFor?.map((elem: any) => elem.mission) ??
      []),
  ];

  const uniqueMissions = Array.from(
    new Map(mergedMissions.map((m) => [m?._id, m])).values()
  );

  const missionsTabMissions = role === "educator" ? uniqueMissions : missions;

  const tabs = [
    {
      id: 0,
      label: "Calendar",
      icon: CalendarIcon,
      component: <CalendarTab calendarTabProps={calendarTabMissions} />,
    },
    {
      id: 1,
      label: "Missions",
      icon: AssignmentIcon,
      component: (
        <MissionsTab
          missionsTabProps={{
            missions: missionsTabMissions,
            refetchMissions: refetchMissionsData,
          }}
        />
      ),
    },
  ];

  return (
    <>
      <PageMeta
        title="Manage & Monitor Missions"
        description="Manage all missions here."
      />
      <KpiCards kpiCardsData={kpis} />
      <TabsHorizontal tabs={tabs} />
    </>
  );
};
