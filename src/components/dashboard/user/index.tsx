import {
  Assignment as AssignmentIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  HourglassBottom as HourglassBottomIcon,
  WatchLater as WatchLaterIcon,
} from "@mui/icons-material";
import { useList } from "@refinedev/core";
import { useEffect, useState } from "react";

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

  const [missions, setMissions] = useState<any[]>([]);
  const [educatorMissions, setEducatorMissions] = useState({
    invitedFor: userProfile?.missionsInvitedFor,
    hiredFor: userProfile?.missionsHiredFor,
  });

  const [kpis, setKpis] = useState<KpiItem[]>(
    defaultKpis?.filter((kpi) => {
      if (role === "organization") return kpi.title !== "Pending Invitations";
      return kpi.title !== "Pending Missions";
    })
  );

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

  useEffect(() => {
    setEducatorMissions((prev) => ({
      ...prev,
      invitedFor: userProfile?.missionsInvitedFor,
      hiredFor: userProfile?.missionsHiredFor,
    }));
  }, [
    userProfile?.missionsInvitedFor?.length,
    userProfile?.missionsHiredFor?.length,
  ]);

  useEffect(() => {
    if (role === "educator") {
      setMissions(educatorMissions?.hiredFor);
    } else if (role === "organization" && organizationMissions?.data) {
      setMissions(organizationMissions.data);
    }
  }, [organizationMissions?.data]);

  useEffect(() => {
    setKpis((prevKpis) =>
      prevKpis.map((kpi) => {
        switch (kpi.title) {
          case "Total Missions":
            return { ...kpi, total: organizationMissions?.total || 0 };
          case "Ongoing Missions":
            return {
              ...kpi,
              total:
                missions?.filter((mission) => mission.status === "ongoing")
                  .length || 0,
            };
          case "Pending Invitations":
            return {
              ...kpi,
              total:
                educatorMissions.invitedFor?.filter(
                  (mission: any) =>
                    mission?.mission && mission.invitationStatus === "pending"
                ).length || 0,
            };
          case "Pending Missions":
            return {
              ...kpi,
              total:
                missions?.filter((mission) => mission.status === "pending")
                  .length || 0,
            };
          case "Completed Missions":
            return {
              ...kpi,
              total:
                missions?.filter((mission) => mission.status === "completed")
                  .length || 0,
            };
          default:
            return kpi;
        }
      })
    );
  }, [missions, educatorMissions?.invitedFor?.length]);

  if (role === "organization" && isLoadingOrganizationMissions) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error loading data</div>;
  }

  const tabViewProps = {
    calendarTabMissions:
      role === "educator"
        ? educatorMissions?.invitedFor?.map((elem: any) => elem.mission)
        : missions,
    missionsTabMissions: {
      missions: role === "educator" ? educatorMissions?.hiredFor : missions,
      refetchMissions: refetchOrganizationMissions,
    },
  };

  console.log("educatorMissions", educatorMissions);

  return (
    <>
      <PageMeta title={title} description={description} />

      <KpiCards kpiCardsData={kpis} />

      <TabsView {...tabViewProps as any} />
    </>
  );
};
