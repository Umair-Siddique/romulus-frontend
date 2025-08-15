import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { useUserContext } from "#context";
import { Box, Theme, useTheme } from "@mui/material";
import { MissionsList, ProfileCard, ProfileHeader } from "#components";
import { useOne } from "@refinedev/core";

export const OrganizationDetails = () => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const { id: organizationId } = useParams();

  const location = useLocation();
  const missionId = location.state?.missionId;

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

  if (organizationDataLoading || missionsDataLoading) {
    return "Loading...";
  } else if (organizationDataError || missionsDataError) {
    return "Error...";
  }

  const missions = missionsData?.data;

  const hasOrganizationsFeedbacks =
    organizationData?.data?.organizationsFeedbacks?.length > 0;

  const organizationFeedbacks = organizationData?.data?.organizationsFeedbacks;

  const tabsContent = [<MissionsList missions={missions} />];

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
        />
      </Box>

      <Box sx={{ mb: theme.spacing(2) }}>
        <ProfileCard organizationData={organizationData?.data} />
      </Box>
    </Box>
  );
};
