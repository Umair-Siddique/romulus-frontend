import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { useUserContext } from "#context";
import { Box, Divider, Theme, useTheme } from "@mui/material";
import {
  Branches,
  MissionsList,
  ProfileCard,
  ProfileHeader,
  TabView,
} from "#components";
import { useOne } from "@refinedev/core";
import { ReportsList } from "#components/profile/ReportsList";

export const OrganizationDetails = ({
  organizationIdProp,
  parentComponent,
  reportId,
}: {
  organizationIdProp: string;
  parentComponent?: string;
  reportId?: string;
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

  const {
    data: organizationData,
    refetch: refetchOrganizationData,
    isLoading: organizationDataLoading,
    isError: organizationDataError,
  } = useOne({
    resource: `organizations/${organizationId}`,
    queryOptions: {
      enabled: !!organizationId,
    },
  });

  const {
    data: missionsData,
    isLoading: missionsDataLoading,
    isError: missionsDataError,
  } = useOne({
    resource: `missions/organization/${organizationId}`,
    queryOptions: {
      enabled: !!organizationId,
    },
  });

  const {
    data: reportsData,
    isLoading: reportsDataLoading,
    isError: reportsDataError,
  } = useOne({
    resource: `reports/organization/${organizationId}`,
    queryOptions: {
      enabled: !!organizationId,
    },
  });

  if (organizationDataLoading || missionsDataLoading || reportsDataLoading) {
    return "Loading...";
  } else if (organizationDataError || missionsDataError || reportsDataError) {
    return "Error...";
  }

  const missions = missionsData?.data;
  const reports = reportsData?.data;

  const tabsData = {
    tabsTitles: ["Missions", "Reports"],
    tabsContent: [
      <MissionsList missions={missions} />,
      <ReportsList reportsData={reports} />,
    ],
  };

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
          <TabView
            tabsTitles={tabsData.tabsTitles}
            tabsContent={tabsData.tabsContent}
          />
        </Box>
      )}
    </Box>
  );
};
