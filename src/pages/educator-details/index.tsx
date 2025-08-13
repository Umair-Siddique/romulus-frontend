import { useLocation, useParams } from "react-router";
import { useTheme, Theme } from "@mui/material/styles";

import { useUserContext } from "#context";
import { Box, Divider, Typography } from "@mui/material";
import {
  ProfileHeader,
  ProfileCard,
  UserBio,
  ProfessionalDetails,
  Reviews,
  TabView,
  MissionsList,
} from "#components";
import { useOne } from "@refinedev/core";
import { formatDate } from "#utils";

export const EducatorDetails = () => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const role = user?.role;

  const { id: educatorId } = useParams();

  const location = useLocation();
  const missionId = location.state?.missionId;

  const { data: educatorData, refetch: refetchEducatorData } = useOne({
    resource: `educators/${educatorId}`,
    queryOptions: {
      enabled: !!educatorId,
    },
  });

  const { data: missionsData, isLoading } = useOne({
    resource: `missions/educator/${educatorId}`,
    queryOptions: {
      enabled: !!educatorId,
    },
  });

  // console.log("EducatorDetails -> missionsData:", missionsData);

  const missions = missionsData?.data?.map((mission: any) => ({
    id: mission?._id,
    missionTitle: mission?.title,
    createdAt: formatDate(mission?.createdAt),
    organizationName: mission?.organization?.organizationName,
    branchName: mission?.branch,
    status: mission?.status,
  }));

  console.log("EducatorDetails -> missions:", missions);

  const hasOrganizationsFeedbacks =
    educatorData?.data?.organizationsFeedbacks?.length > 0;

  const organizationFeedbacks = educatorData?.data?.organizationsFeedbacks;

  const tabsNavigation = [{ title: "Missions" }, { title: "Reports" }];

  const tabsContent = [
    <MissionsList missions={missions} />,
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Reports
      </Typography>
    </Box>,
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
          key={educatorData?.data?.status + educatorId}
          role={role}
          missionId={missionId}
          educatorId={educatorId!}
          refetchEducatorData={refetchEducatorData}
          educatorData={educatorData?.data}
        />
      </Box>

      <Box sx={{ mb: theme.spacing(2) }}>
        <ProfileCard
          educatorId={educatorId!}
          educatorData={educatorData?.data}
        />
      </Box>

      <Box sx={{ mb: theme.spacing(2) }}>
        <UserBio educatorData={educatorData?.data} />
      </Box>

      <Divider sx={{ mb: theme.spacing(2) }} />

      <Box sx={{ mb: theme.spacing(2) }}>
        <ProfessionalDetails educatorData={educatorData?.data} />
      </Box>

      <Divider sx={{ mb: theme.spacing(2) }} />

      {role === "admin" && (
        <Box sx={{ mb: theme.spacing(2) }}>
          <TabView tabsNavigation={tabsNavigation} tabsContent={tabsContent} />
        </Box>
      )}

      {hasOrganizationsFeedbacks && (
        <Box sx={{ mb: theme.spacing(2) }}>
          {organizationFeedbacks.map((feedback: any, index: number) => (
            <Reviews feedback={feedback} key={index} />
          ))}
        </Box>
      )}
    </Box>
  );
};
