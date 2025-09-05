import { useEffect } from "react";
import { useOne } from "@refinedev/core";
import { Box, Divider, Theme, useTheme } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import { AssignmentOutlined as AssignmentIcon } from "@mui/icons-material";

import {
  Branches,
  MissionsList,
  ProfileCard,
  ProfileHeader,
  TabsHorizontal,
} from "#components";
import { useUserContext } from "#context";
import { ReportsList } from "#components/profile/ReportsList";

export const OrganizationDetails = ({
  organizationIdProp,
  parentComponent,
  reportId,
  refetchReportData,
}: {
  organizationIdProp?: string;
  parentComponent?: string;
  reportId?: string;
  refetchReportData?: () => void;
}) => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const { id: organization } = useParams();

  const location = useLocation();
  const missionId = location.state?.missionId;

  const organizationId = organizationIdProp || organization;

  const { data: organizationData, refetch: refetchOrganizationData } = useOne({
    resource: `organizations/${organizationId}`,
    queryOptions: {
      enabled: !!organizationId,
    },
  });

  const { data: missionsData } = useOne({
    resource: `missions/organization/${organizationId}`,
    queryOptions: {
      enabled: !!organizationId,
    },
  });

  const { data: reportsData } = useOne({
    resource: `reports/organization/${organizationId}`,
    queryOptions: {
      enabled: !!organizationId,
    },
  });

  const missions = missionsData?.data;
  const reports = reportsData?.data;

  const tabsData = {
    tabsTitles: ["Missions", "Reports"],
    tabContents: [
      <MissionsList missions={missions} />,
      <ReportsList reportsData={reports} />,
    ],
  };

  const tabs = [
    {
      id: "missions",
      label: "Missions",
      icon: AssignmentIcon,
      component: <MissionsList missions={missions} />,
    },
    {
      id: "reports",
      label: "Reports",
      icon: AssignmentIcon,
      component: <ReportsList reportsData={reports} />,
    },
  ];

  return (
    <Box
      sx={{
        p: theme.spacing(3),
        mb: theme.spacing(3),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.default,
        width: "100%",
      }}
    >
      <Box sx={{ mb: theme.spacing(2) }}>
        <ProfileHeader
          key={organizationData?.data?.status + organizationId}
          role={role}
          missionId={missionId}
          organizationIdProp={organizationId}
          refetchOrganizationData={refetchOrganizationData}
          educatorData={organizationData?.data}
          reportId={reportId}
          parentComponent={parentComponent}
          refetchReportData={refetchReportData}
        />
      </Box>

      <Box sx={{ mb: theme.spacing(2) }}>
        <ProfileCard
          organizationData={organizationData?.data}
          parentComponent={parentComponent}
        />
      </Box>

      {parentComponent !== "reports" && (
        <Box sx={{ mb: theme.spacing(2) }}>
          <Branches organizationData={organizationData?.data} />
        </Box>
      )}

      {parentComponent !== "reports" && (
        <Divider sx={{ mb: theme.spacing(2) }} />
      )}

      {role === "admin" && parentComponent !== "reports" && (
        <Box sx={{ mb: theme.spacing(2) }}>
          <TabsHorizontal tabs={tabs} />
        </Box>
      )}
    </Box>
  );
};
