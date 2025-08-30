import { useLocation, useParams } from "react-router";
import { useTheme, Theme } from "@mui/material/styles";

import { useUserContext } from "#context";
import { Box, Divider } from "@mui/material";
import {
  ProfileHeader,
  ProfileCard,
  UserBio,
  ProfessionalDetails,
  Reviews,
  TabViewHorizontal,
  MissionsList,
} from "#components";
import { useOne } from "@refinedev/core";

export const EducatorDetails = ({
  educatorIdProp,
  parentComponent,
  reportId,
  showViewDetails,
}: {
  educatorIdProp?: string;
  parentComponent?: string;
  reportId?: string;
  showViewDetails?: boolean;
}) => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const role = user?.role;

  const { id } = useParams();

  const educatorId = educatorIdProp || id;

  const location = useLocation();
  const missionId = location.state?.missionId;

  const { data: educatorData, refetch: refetchEducatorData } = useOne({
    resource: `educators/${educatorId}`,
    queryOptions: {
      enabled: !!educatorId,
    },
  });

  const { data: missionsData } = useOne({
    resource: `missions/educator/${educatorId}`,
    queryOptions: {
      enabled: !!educatorId,
    },
  });

  const missions = missionsData?.data;

  const hasOrganizationsFeedbacks =
    educatorData?.data?.organizationsFeedbacks?.length > 0;

  const organizationFeedbacks = educatorData?.data?.organizationsFeedbacks;

  const tabsData = {
    tabsTitles: ["Missions"],
    tabsContent: [<MissionsList missions={missions} />],
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
          key={educatorData?.data?.status + educatorId}
          role={role}
          missionId={missionId}
          educatorId={educatorId}
          refetchEducatorData={refetchEducatorData}
          educatorData={educatorData?.data}
          parentComponent={parentComponent}
          reportId={reportId}
          showViewDetails={showViewDetails}
        />
      </Box>

      <Box sx={{ mb: theme.spacing(2) }}>
        <ProfileCard
          educatorData={educatorData?.data}
          parentComponent={parentComponent}
        />
      </Box>

      {parentComponent !== "reports" && (
        <Box sx={{ mb: theme.spacing(2) }}>
          <UserBio educatorData={educatorData?.data} />
        </Box>
      )}

      {parentComponent !== "reports" && (
        <Divider sx={{ mb: theme.spacing(2) }} />
      )}

      {parentComponent !== "reports" && (
        <Box sx={{ mb: theme.spacing(2) }}>
          <ProfessionalDetails educatorData={educatorData?.data} />
        </Box>
      )}

      {parentComponent !== "reports" && (
        <Divider sx={{ mb: theme.spacing(2) }} />
      )}

      {role === "admin" && parentComponent !== "reports" && (
        <Box sx={{ mb: theme.spacing(2) }}>
          <TabViewHorizontal
            tabsTitles={tabsData.tabsTitles}
            tabsContent={tabsData.tabsContent}
          />
        </Box>
      )}

      {hasOrganizationsFeedbacks && parentComponent !== "reports" && (
        <Box sx={{ mb: theme.spacing(2) }}>
          {organizationFeedbacks.map((feedback: any, index: number) => (
            <Reviews feedback={feedback} key={index} />
          ))}
        </Box>
      )}
    </Box>
  );
};
