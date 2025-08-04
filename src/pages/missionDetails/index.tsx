// Main container component
import { Box, TextField, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useOne, useUpdate } from "@refinedev/core";
import { useUserContext } from "#context";
import { useTheme, Theme } from "@mui/material/styles";
import { useState, useEffect } from "react";

import {
  MissionHeader,
  MissionInfoSection,
  DocumentDownloadSection,
  ContactInformationCard,
  MissionDescriptionCard,
  TabView,
  EducatorTable,
  Reviews,
  Modal,
} from "#components";
import { formatDate, formatTime, getStatusColor } from "#utils";

export const MissionDetails = () => {
  const theme = useTheme<Theme>();
  const { user, userProfile, refetchUserProfile } = useUserContext();
  const { role, educatorId, organizationId } = user;
  const { missionsInvitedFor, organizationName, firstName, lastName } =
    userProfile || {};

  const { id: missionId } = useParams();
  const roleId = educatorId || organizationId;

  // Modal state
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const [review, setReview] = useState<any>({
    feedback: "",
    rating: 0,
  });

  const { data, refetch: refetchMission } = useOne({
    resource:
      role === "admin"
        ? `missions/${missionId}`
        : `missions/${missionId}/${role}/${roleId}`,
    queryOptions: {
      enabled: true,
    },
  });

  const { mutate: updateMission } = useUpdate({
    resource: "missions",
  });

  const { mutate: updateEducator } = useUpdate({
    resource: "educators",
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
    missionDate:
      formatDate(mission?.start?.split("T")[0]) || "Date Unavailable",
    missionTime:
      `${formatTime(
        `${mission?.start?.split("T")[1].split(":")[0]}:${
          mission?.start?.split("T")[1].split(":")[1]
        }`
      )} to ${formatTime(
        `${mission?.end?.split("T")[1].split(":")[0]}:${
          mission?.end?.split("T")[1].split(":")[1]
        }`
      )}` || "Time Unavailable",
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
      email: mission?.organization?.user?.email || "Email Unavailable",
    },
    hasEducatorsFeedbacks: !!mission?.educatorsFeedbacks?.length,
    educatorFeedbacks: mission?.educatorsFeedbacks || [
      {
        name: "John Doe",
        rating: 4.5,
        comment:
          "Great experience. Students were attentive, and the coordinator was helpful.",
        givenAt: "2023-10-01T12:00:00Z",
      },
    ],
    hasPreferredEducator: !!mission?.preferredEducator,
    preferredEducator: mission?.preferredEducator,
    invitedEducators: mission?.invitedEducators || [],
    hiredEducators: mission?.hiredEducators || [],
  };

  // console.log("MissionDetails.tsx -> mission:", mission);

  // Check if feedback modal should open
  useEffect(() => {
    if (
      missionData.missionStatus === "completed" &&
      !missionData.hasEducatorsFeedbacks
    ) {
      setFeedbackModalOpen(true);
    }
  }, [missionData.missionStatus, missionData.hasEducatorsFeedbacks]);

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    if (review.rating === 0) {
      alert("Please provide a rating before submitting feedback.");
      return;
    }

    let feedback;

    if (user.role === "organization") {
      feedback = {
        organizationId,
        userName: organizationName,
        feedback: review.feedback,
        rating: review.rating,
      };

      updateEducator({
        id: educatorId,
        values: feedback,
      });
    } else {
      feedback = {
        educatorId,
        userName: `${firstName} ${lastName}`,
        feedback: review.feedback,
        rating: review.rating,
      };

      updateMission({
        id: missionId,
        values: feedback,
      });
    }

    // console.log("MissionDetails.tsx -> feedback:", feedback);

    refetchMission();

    setFeedbackModalOpen(false);
    setReview({
      feedback: "",
      rating: 0,
    });
  };

  const closeFeedbackModal = () => {
    setFeedbackModalOpen(false);
    setReview({
      feedback: "",
      rating: 0,
    });
  };

  // console.log("MissionDetails.tsx -> missionData:", missionData);

  const hasGivenFeedback = missionData.educatorFeedbacks.some(
    (feedback: any) => feedback.educatorId === educatorId
  );

  const tabsNavigation = [
    { title: "Invited Educators" },
    { title: "Hired Educators" },
  ];

  const tabsContent = [
    <EducatorTable
      key="invited"
      educators={missionData.invitedEducators}
      missionId={missionData.id}
    />,
    <EducatorTable
      key="hired"
      educators={missionData.hiredEducators}
      missionId={missionData.id}
    />,
  ];

  console.log(role)
  console.log(hasGivenFeedback)

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

      {role === "educator" &&
        missionData.hasEducatorsFeedbacks &&
        missionData.educatorFeedbacks.map((feedback: any, index: number) => (
          <Box key={index}>
            <Reviews feedback={feedback} />
          </Box>
        ))}

      {role === "organization" && (
        <TabView tabsNavigation={tabsNavigation} tabsContent={tabsContent} />
      )}

      {/* Feedback Modal */}
      {role !== "admin" && !hasGivenFeedback && (
        <Modal
          open={feedbackModalOpen}
          onClose={closeFeedbackModal}
          onSubmit={closeFeedbackModal}
          button1OnClick={handleFeedbackSubmit}
          hasButton1={true}
          title="Give Feedback on This Mission"
          description="How would you rate this mission experience?"
          hasButton={true}
          buttonText="Close"
          button1Text="Submit Feedback"
          hasRating={true}
          rating={review.rating}
          onRatingChange={(rating) => setReview({ ...review, rating })}
          additionalElements={
            <Box width="500px">
              <Typography
                variant="body2"
                sx={{
                  fontWeight: theme.typography.fontWeightMedium,
                  color: theme.palette.text.primary,
                  mb: theme.spacing(1),
                  textAlign: "left",
                }}
              >
                Comment
              </Typography>
              <TextField
                value={review.feedback}
                onChange={(e) =>
                  setReview({
                    ...review,
                    feedback: e.target.value,
                  })
                }
                placeholder="Write here."
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: theme.palette.background.paper,
                  },
                }}
              />
            </Box>
          }
          hasAdditionalElements={true}
        />
      )}
    </Box>
  );
};
