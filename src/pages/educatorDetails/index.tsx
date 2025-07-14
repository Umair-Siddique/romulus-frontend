import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTheme, Theme } from "@mui/material/styles";

import { useUserContext } from "#context";
import { Box } from "@mui/material";
import {
  ProfileHeader,
  ProfileCard,
  ProfessionalDetails,
  MissionsList,
  Reviews,
} from "#components";

export const EducatorDetails = () => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "educator") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

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
        <ProfileHeader role={role} />
      </Box>

      <Box sx={{ mb: theme.spacing(2) }}>
        <ProfileCard />
      </Box>

      <Box sx={{ mb: theme.spacing(2) }}>
        <ProfessionalDetails />
      </Box>

      <Box sx={{ mb: theme.spacing(2) }}>
        <MissionsList />
      </Box>

      <Box sx={{ mb: theme.spacing(2) }}>
        <Reviews title="Reviews" />
      </Box>
    </Box>
  );
};
