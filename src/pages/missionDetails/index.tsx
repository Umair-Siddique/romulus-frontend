// Main container component
import { getStatusColor } from "#utils/getStatusColor";
import { Box } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { useOne } from "@refinedev/core";

import { useUserContext } from "#context";
import {
  MissionHeader,
  MissionInfoSection,
  DocumentDownloadSection,
  ContactInformationCard,
  MissionDescriptionCard,
  EducatorFeedbackCard,
  TabView,
  EducatorsTable,
} from "#components";

export const MissionDetails = () => {
  const theme = useTheme<Theme>();
  const { user, userProfile, refetchUserProfile } = useUserContext();
  const { role, educatorId, organizationId } = user;
  const { missionsInvitedFor } = userProfile || {};

  const missionId = window.location.pathname.split("/").pop();
  const roleId = educatorId || organizationId;

  const { data } = useOne({
    resource: `missions/${missionId}/${role}/${roleId}`,
    queryOptions: {
      enabled: true,
    },
  });

  const mission = data?.data || {};

  const invitationStatus = missionsInvitedFor?.find(
    (elem: any) => elem?.mission?._id === missionId
  )?.invitationStatus;

  const missionData = {
    id: missionId || "Mission ID Unavailable",

    educatorId: educatorId || "Educator ID Unavailable",

    missionTitle: mission?.title || "Mission Title Unavailable",

    invitationStatus,

    organizationName:
      mission?.organization?.organizationName || "Organization Unavailable",

    missionDate: mission?.start?.split("T")[0] || "Date Unavailable",

    missionTime:
      `${mission?.start?.split("T")[1]?.split(".")[0]} to ${
        mission?.end?.split("T")[1]?.split(".")[0]
      }` || "Time Unavailable",

    branchName: mission?.branch || "Branch Name Unavailable",

    missionLocation: `${mission?.organization?.city || "City Unavailable"}, ${
      mission?.organization?.country || "Country Unavailable"
    }`,

    branchAddress:
      mission?.organization?.branches?.find(
        (branch: any) => branch.branchName === mission?.branch
      )?.branchAddress || "Address Unavailable",

    missionStatus: mission?.status || "Status Unavailable",

    missionDescription: mission?.description || "Description Unavailable",

    hasResidenceGuidelines:
      Object.keys(mission?.technicalDocument || {}).length > 0,

    residenceGuidelines: {
      name: "Residence Guidelines",
      url: mission?.technicalDocument,
    },

    organizationContact: {
      phone: mission?.organization?.phone || "Phone Unavailable",
      email: mission?.organization?.email || "Email Unavailable",
    },

    hasEducatorsFeedbacks: !!mission?.educatorsFeedbacks?.length,

    hasPreferredEducator: !!mission?.preferredEducator,

    preferredEducator: {
      name: mission?.preferredEducator?.name || "John Clark",
      rating: mission?.preferredEducator?.rating || 4.6,
      avatar:
        mission?.preferredEducator?.avatar ||
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },

    invitedEducators: mission?.invitedEducators || [],

    hiredEducators: mission?.hiredEducators || [],
  };
  const tabsNavigation = [
    { title: "Invited Educators" },
    { title: "Hired Educators" },
  ];

  const tabsContent = [<EducatorsTable />, <EducatorsTable />];

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
        <MissionHeader
          role={role}
          missionData={missionData}
          refetch={refetchUserProfile ?? (() => {})}
        />
      </Box>

      <Box sx={{ mb: theme.spacing(2) }}>
        <MissionInfoSection
          missionData={missionData}
          getStatusColor={getStatusColor}
        />
      </Box>

      {missionData.hasResidenceGuidelines && (
        <Box sx={{ mb: theme.spacing(2) }}>
          <DocumentDownloadSection
            residenceGuidelines={missionData.residenceGuidelines}
          />
        </Box>
      )}

      <Box sx={{ mb: theme.spacing(2) }}>
        <ContactInformationCard
          organizationContact={missionData.organizationContact}
        />
      </Box>

      <Box
        sx={{ mb: missionData.hasEducatorsFeedbacks ? theme.spacing(2) : 0 }}
      >
        <MissionDescriptionCard description={missionData.missionDescription} />
      </Box>

      {missionData.hasEducatorsFeedbacks && (
        <Box>
          <EducatorFeedbackCard />
        </Box>
      )}

      {role === "organization" && (
        <TabView tabsNavigation={tabsNavigation} tabsContent={tabsContent} />
      )}
    </Box>
  );
};
