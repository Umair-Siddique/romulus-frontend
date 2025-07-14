// Main container component
import { Box } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { useOne } from "@refinedev/core";

import { getStatusColor } from "#utils";
import { useUserContext } from "#context";
import {
  MissionHeader,
  MissionInfoSection,
  DocumentDownloadSection,
  ContactInformationCard,
  MissionDescriptionCard,
  TabView,
  EducatorTable,
  Reviews,
} from "#components";
import { useParams } from "react-router";

export const MissionDetails = () => {
  const theme = useTheme<Theme>();
  const { user, userProfile, refetchUserProfile } = useUserContext();
  const { role, educatorId, organizationId } = user;
  const { missionsInvitedFor } = userProfile || {};

  const { id: missionId } = useParams();
  const roleId = educatorId || organizationId;

  const { data, refetch: refetchMission } = useOne({
    resource: `missions/${missionId}/${role}/${roleId}`,
    queryOptions: {
      enabled: true,
    },
  });

  const mission = data?.data || {};

  const invitationStatus = missionsInvitedFor?.find(
    (elem: any) => elem?.mission?._id === missionId
  )?.invitationStatus;

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}Z`)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace("AM", "am")
      .replace("PM", "pm");
  };

  const formatDate = (dateISO: string) => {
    const date = new Date(dateISO);
    const parts = date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .split(" ");

    const formattedDate = `${parts[0]} ${parts[1]}, ${parts[2]}`;
    return formattedDate;
  };

  const missionData = {
    id: missionId || "Mission ID Unavailable",

    educatorId: educatorId || "Educator ID Unavailable",

    missionTitle: mission?.title || "Mission Title Unavailable",

    invitationStatus,

    organizationName:
      mission?.organization?.organizationName || "Organization Unavailable",

    missionDate:
      formatDate(mission?.start?.split("T")[0]) || "Date Unavailable",

    missionTime:
      `${formatTime(
        mission?.start?.split("T")[1]?.split(".")[0]
      )} to ${formatTime(mission?.end?.split("T")[1]?.split(".")[0])}` ||
      "Time Unavailable",

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

  const tabsContent = [
    <EducatorTable
      educators={missionData.invitedEducators}
      missionId={missionData.id}
    />,
    <EducatorTable
      educators={missionData.hiredEducators}
      missionId={missionData.id}
    />,
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
        <MissionHeader
          role={role}
          missionData={missionData}
          refetch={refetchUserProfile ?? (() => {})}
          refetchMission={refetchMission}
          showMarkAsCompletedButton={!!missionData.hiredEducators.length}
        />
      </Box>

      <Box sx={{ mb: theme.spacing(2) }}>
        <MissionInfoSection
          missionData={missionData}
          getStatusColor={getStatusColor}
        />
      </Box>

      {missionData.hasResidenceGuidelines && role !== "organization" && (
        <Box sx={{ mb: theme.spacing(2) }}>
          <DocumentDownloadSection
            residenceGuidelines={missionData.residenceGuidelines}
          />
        </Box>
      )}

      {role !== "organization" && (
        <Box sx={{ mb: theme.spacing(2) }}>
          <ContactInformationCard
            organizationContact={missionData.organizationContact}
          />
        </Box>
      )}

      <Box
        sx={{ mb: missionData.hasEducatorsFeedbacks ? theme.spacing(2) : 0 }}
      >
        <MissionDescriptionCard description={missionData.missionDescription} />
      </Box>

      {missionData.hasEducatorsFeedbacks && (
        <Box>
          <Reviews title="Your Feedback" />
        </Box>
      )}

      {role === "organization" && (
        <TabView tabsNavigation={tabsNavigation} tabsContent={tabsContent} />
      )}
    </Box>
  );
};
