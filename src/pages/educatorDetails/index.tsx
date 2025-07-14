import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTheme, Theme } from "@mui/material/styles";

import { useUserContext } from "#context";
import { Box } from "@mui/material";
import {
  EducatorHeader,
  EducatorInformation,
  MissionsList,
  ProfessionalDetails,
  Reviews,
} from "#components";

export const EducatorDetails = () => {
  const theme = useTheme<Theme>();
  const { user } = useUserContext();

  const { role } = user;

  const navigate = useNavigate();

  useEffect(() => {
    if (role === "educator") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

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
        <EducatorHeader role={role} />
      </Box>

      <Box sx={{ mb: theme.spacing(2) }}>
        <EducatorInformation />
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
