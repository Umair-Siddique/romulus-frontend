import { useMemo } from "react";
import { useList } from "@refinedev/core";
import {
  Assignment as AssignmentIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  HourglassBottom as HourglassBottomIcon,
  HourglassTop as HourglassTopIcon,
} from "@mui/icons-material";

import { TabsView, KpiCards, PageMeta } from "#components";

import { KpiItem } from "#types";
import { useUserContext } from "#context";

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

  const title =
    role === "admin"
      ? "Manage & Monitor Missions, Educators & Organizations"
      : "Manage & Monitor Missions";

  const description =
    role === "admin"
      ? `Manage all your missions, educators and organizations in one place.`
      : role === "organization"
      ? `Manage all your missions, track educators and monitor progress in one place.`
      : `Manage all your missions, and monitor progress in one place.`;

  const {
    data: missionsData,
    isLoading: isMissionsDataLoading,
    isError,
    refetch: refetchMissionsData,
  } = useList({
    resource:
      role === "organization"
        ? `missions/organization/${organizationId}`
        : `missions`,
    queryOptions: {
      enabled: role === "organization" || role === "admin",
    },
  });

  // console.log("Dashboard.tsx -> missionsData:", missionsData);

  // Optimized missions selection
  const missions = useMemo(() => {
    return role === "educator"
      ? userProfile?.missionsHiredFor || []
      : missionsData?.data || [];
  }, [role, userProfile?.missionsHiredFor, missionsData?.data]);

  // Optimized mission counts calculation
  const missionCounts = useMemo(() => {
    const pendingInvitations =
      role === "educator"
        ? userProfile?.missionsInvitedFor?.filter(
            (mission: any) =>
              mission?.mission && mission.invitationStatus === "pending"
          ).length || 0
        : 0;

    return getMissionCounts(missions, pendingInvitations);
  }, [missions, role, userProfile?.missionsInvitedFor]);

  // Optimized KPIs calculation
  const kpis = useMemo(() => {
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

    return getFilteredKpis(role!, missionCounts, totalMissions!);
  }, [
    role,
    missionsData?.total,
    userProfile?.missionsHiredFor?.length,
    missionCounts,
  ]);

  // Optimized tab missions
  const tabMissions = useMemo(() => {
    const calendarTabMissions =
      role === "educator"
        ? userProfile?.missionsInvitedFor?.map((elem: any) => elem.mission) ??
          []
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

    // console.log("Dashboard.tsx -> calendarTabMissions:", calendarTabMissions);
    // console.log("Dashboard.tsx -> missionsTabMissions:", missionsTabMissions);

    return {
      calendarTabMissions,
      missionsTabMissions: {
        missions: missionsTabMissions,
        refetchMissions: refetchMissionsData,
      },
    };
  }, [
    role,
    userProfile?.missionsInvitedFor,
    userProfile?.missionsHiredFor,
    missions,
    refetchMissionsData,
  ]);

  if (role === "organization" && isMissionsDataLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  // console.log("Dashboard.tsx -> tabMissions:", tabMissions);

  return (
    <>
      <PageMeta title={title} description={description} />
      <KpiCards kpiCardsData={kpis} />
      <TabsView {...tabMissions} />
    </>
  );
};
