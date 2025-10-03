import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useOne, useUpdate } from "@refinedev/core";
import { useTheme, Theme } from "@mui/material/styles";
import { Box, TextField, Typography } from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";

import {
  MissionHeader,
  MissionInfoSection,
  DocumentDownloadSection,
  ContactInformationCard,
  MissionDescriptionCard,
  TabsHorizontal,
  EducatorTable,
  Reviews,
  Modal,
} from "#components";
import { useUserContext } from "#context";
import { formatDate, formatTime, getStatusColor } from "#lib";

export const MissionDetails = ({
  missionIdProp,
  parentComponent,
}: {
  missionIdProp?: string;
  parentComponent?: string;
}) => {
  const theme = useTheme<Theme>();
  const { user, userProfile, refetchUserProfile } = useUserContext();
  const { role, educatorId, organizationId } = user;
  const { missionsInvitedFor, organizationName, firstName, lastName } =
    userProfile || {};

  const { id } = useParams();
  const missionId = missionIdProp || id;

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
    successNotification: false,
  });

  const { mutate: updateEducator } = useUpdate({
    resource: "educators",
    successNotification: false,
  });

  const mission = data?.data || {};

  const invitationStatus = missionsInvitedFor?.find(
    (elem: any) => elem?.mission?._id === missionId
  )?.invitationStatus;

  const missionData = {
    id: missionId || "N/A",
    educatorId: educatorId || "N/A",
    missionTitle: mission?.title || "N/A",
    invitationStatus,
    organizationName: mission?.organization?.organizationName || "N/A",
    missionDate: formatDate(mission?.start?.split("T")[0]) || "N/A",
    missionTime:
      `${formatTime(
        `${mission?.start?.split("T")[1].split(":")[0]}:${
          mission?.start?.split("T")[1].split(":")[1]
        }`
      )} to ${formatTime(
        `${mission?.end?.split("T")[1].split(":")[0]}:${
          mission?.end?.split("T")[1].split(":")[1]
        }`
      )}` || "N/A",
    branchName: mission?.branch || "N/A",
    missionLocation: `${mission?.organization?.city || "N/A"}, ${
      mission?.organization?.country || "N/A"
    }`,
    branchAddress:
      mission?.organization?.branches?.find(
        (branch: any) => branch.branchName === mission?.branch
      )?.branchAddress || "N/A",
    missionStatus: mission?.status || "N/A",
    missionDescription: mission?.description || "N/A",
    hasResidenceGuidelines:
      Object.keys(mission?.technicalDocument || {}).length > 0,
    residenceGuidelines: {
      name: "Residence Guidelines",
      url: mission?.technicalDocument,
    },
    organizationContact: {
      userId: mission?.organization?.user?._id ?? "N/A",
      name: mission?.organization?.organizationName ?? "N/A",
      avatar: mission?.organization?.avatar ?? "N/A",
      phone: mission?.organization?.phone ?? "N/A",
      email: mission?.organization?.user?.email ?? "N/A",
    },
    hasEducatorsFeedbacks: !!mission?.educatorsFeedbacks?.length,
    hasGivenFeedbackToEducator: mission?.hasGivenFeedbackToEducator,
    educatorsFeedbacks: mission?.educatorsFeedbacks || [
      {
        userName: "N/A",
        rating: "N/A",
        feedback: "N/A",
        createdAt: "N/A",
      },
    ],
    hasPreferredEducator: !!mission?.preferredEducator,
    preferredEducator: mission?.preferredEducator,
    invitedEducators: mission?.invitedEducators || [],
    hiredEducators: mission?.hiredEducators || [],
    skills: mission?.skills?.join(", ") || "",
  };

  useEffect(() => {
    const hasGivenFeedback =
      role === "educator"
        ? missionData.educatorsFeedbacks.some(
            (feedback: any) => feedback.educatorId === educatorId
          )
        : missionData.hasGivenFeedbackToEducator;

    const showFeedbackModal =
      role !== "admin" &&
      missionData.missionStatus === "completed" &&
      !hasGivenFeedback;

    if (showFeedbackModal) {
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

    if (role === "organization") {
      feedback = {
        organizationId,
        userName: organizationName,
        feedback: review.feedback,
        rating: review.rating,
      };

      const educatorId = missionData.hiredEducators[0];

      updateEducator({
        id: educatorId,
        values: feedback,
      });

      updateMission({
        id: missionId,
        values: { hasGivenFeedbackToEducator: true },
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

  const showEducatorReviews =
    role === "educator" && missionData.hasEducatorsFeedbacks;

  const tabs = [
    {
      id: 0,
      label: "Invited Educators",
      icon: PersonIcon,
      component: (
        <EducatorTable
          educators={missionData.invitedEducators}
          missionId={missionData.id}
          tableType="invited"
        />
      ),
    },
    {
      id: 1,
      label: "Hired Educators",
      icon: PersonIcon,
      component: (
        <EducatorTable
          educators={missionData.hiredEducators}
          missionId={missionData.id}
          tableType="hired"
        />
      ),
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
        <MissionHeader
          role={role}
          missionData={missionData}
          refetch={refetchUserProfile ?? (() => {})}
          refetchMission={refetchMission}
          showMarkAsCompletedButton={!!missionData.hiredEducators.length}
          parentComponent={parentComponent}
        />
      </Box>

      <Box sx={{ mb: theme.spacing(2) }}>
        <MissionInfoSection missionData={missionData} />
      </Box>

      {missionData.hasResidenceGuidelines &&
        parentComponent !== "reports" &&
        role !== "organization" && (
          <Box sx={{ mb: theme.spacing(2) }}>
            <DocumentDownloadSection
              residenceGuidelines={missionData.residenceGuidelines}
            />
          </Box>
        )}

      {role !== "organization" && parentComponent !== "reports" && (
        <Box sx={{ mb: theme.spacing(2) }}>
          <ContactInformationCard
            organizationContact={missionData.organizationContact}
          />
        </Box>
      )}

      {parentComponent !== "reports" && (
        <Box
          sx={{ mb: missionData.hasEducatorsFeedbacks ? theme.spacing(2) : 0 }}
        >
          <MissionDescriptionCard
            description={missionData.missionDescription}
          />
        </Box>
      )}

      {showEducatorReviews &&
        parentComponent !== "reports" &&
        missionData.educatorsFeedbacks.map((feedback: any, index: number) => (
          <Box key={index}>
            <Reviews feedback={feedback} />
          </Box>
        ))}

      {role === "organization" && parentComponent !== "reports" && (
        <TabsHorizontal tabs={tabs} />
      )}

      {/* Feedback Modal */}
      <Modal
        open={feedbackModalOpen}
        onClose={closeFeedbackModal}
        onSubmit={closeFeedbackModal}
        button1OnClick={handleFeedbackSubmit}
        hasButton1={true}
        title={
          role === "organization"
            ? "Give Feedback to This Educator"
            : "Give Feedback to This Mission"
        }
        description={
          role === "organization"
            ? "How would you rate the experience with this educator?"
            : "How would you rate the experience with this mission?"
        }
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
    </Box>
  );
};
