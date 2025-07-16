import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useTheme, Theme } from "@mui/material/styles";

import { useUserContext } from "#context";
import { Box, Divider } from "@mui/material";
import {
  ProfileHeader,
  ProfileCard,
  UserBio,
  ProfessionalDetails,
  MissionsList,
  Reviews,
} from "#components";
import { useOne } from "@refinedev/core";

export const EducatorDetails = () => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const role = user?.role;

  const navigate = useNavigate();

  const { id: educatorId } = useParams();

  const location = useLocation();
  const missionId = location.state?.missionId;

  useEffect(() => {
    if (role === "educator") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const { data: educatorData } = useOne({
    resource: `educators/${educatorId}`,
    queryOptions: {
      enabled: !!educatorId,
    },
  });

  const hasOrganizationsFeedbacks =
    educatorData?.data?.organizationsFeedbacks?.length > 0;

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
          role={role}
          missionId={missionId}
          educatorId={educatorId!}
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
          <MissionsList />
        </Box>
      )}

      {hasOrganizationsFeedbacks && (
        <Box sx={{ mb: theme.spacing(2) }}>
          <Reviews title="Reviews" />
        </Box>
      )}
    </Box>
  );
};
