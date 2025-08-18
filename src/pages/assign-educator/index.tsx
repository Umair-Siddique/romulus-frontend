import { Avatar, Box, Button, Chip, Typography } from "@mui/material";
import { useCustom, useUpdate } from "@refinedev/core";
import { Lens as CircleIcon } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useUserContext } from "#context";

export const AssignEducator = () => {
  const theme = useTheme();

  const { user } = useUserContext();

  const navigate = useNavigate();

  const role = user?.role;

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [role, navigate]);

  const { state } = useLocation();

  const { missionId, missionSkills } = state;

  const { data: EducatorData, refetch: refetchEducatorData } = useCustom({
    url: `/educators/get-by-skills`,
    method: "get",
    config: {
      query: {
        skills: missionSkills,
      },
    },
  });

  const { mutate: updateMission } = useUpdate({
    resource: "missions",
    id: missionId,
    mutationOptions: {
      onSuccess: () => {
        refetchEducatorData();
      },
    },
  });

  const { mutate: updateEducator } = useUpdate({
    resource: "educators",
    id: EducatorData?.data?._id,
    mutationOptions: {
      onSuccess: () => {
        refetchEducatorData();
      },
    },
  });

  const educatorsArray = EducatorData?.data?.map((educator: any) => ({
    id: educator._id,
    avatar: educator.avatar,
    name: `${educator.firstName} ${educator.lastName}`,
    availableForHiring: educator.availableForHiring,
    profession: educator.profession,
    hourlyRate: educator.hourlyRate,
    skills: educator.skills,
  }));

  console.log("educatorsArray", educatorsArray);

  const handleAssignEducator = (educator: any) => {
    updateMission({
      id: missionId,
      values: {
        educatorId: educator.id,
        status: "ongoing",
      },
    });

    updateEducator({
      id: educator.id,
      values: {
        availableForHiring: false,
        missionId,
      },
    });
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
      {educatorsArray?.map((educator: any, index: number) => (
        <Box
          key={index}
          sx={{
            width: "400px",
            height: "400px",
            p: 3,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Avatar
            src={educator.avatar}
            alt={educator.name}
            sx={{
              width: "150px",
              height: "150px",
              mb: 2,
              border: `3px solid ${theme.palette.primary.light}`,
              boxShadow: theme.shadows[3],
            }}
          />{" "}
          <Typography
            variant="h6"
            sx={{ fontWeight: theme.typography.fontWeightMedium }}
          >
            {educator.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <CircleIcon
              sx={{
                color: educator.availableForHiring
                  ? theme.palette.success.main
                  : theme.palette.error.main,
                fontSize: "12px",
              }}
            />
            {educator.availableForHiring ? "Available" : "Unavailable"}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: theme.typography.fontWeightMedium }}
            >
              {educator.profession}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.primary.main,
              }}
            >
              ${educator.hourlyRate}/hr
            </Typography>
          </Box>
          <Box sx={{ width: "100%", mt: theme.spacing(2) }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: theme.spacing(1),
              }}
            >
              {educator.skills.map((skill: string, index: number) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.text.primary,
                    fontSize: "0.875rem",
                    "& .MuiChip-deleteIcon": {
                      color: theme.palette.text.secondary,
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{ width: "100%" }}
              onClick={() => navigate(`/educators/${educator.id}`)}
            >
              View Details
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
              onClick={() => handleAssignEducator(educator)}
            >
              Assign
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
