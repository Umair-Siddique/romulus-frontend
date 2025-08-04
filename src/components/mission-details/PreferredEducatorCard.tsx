import { Star } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useOne } from "@refinedev/core";
import { memo } from "react";
import { useNavigate } from "react-router";

export const PreferredEducatorCard = memo(({ preferredEducator }: any) => {
  const { data: educatorData } = useOne({
    resource: "educators",
    id: preferredEducator,
  });

  // console.log("preferredEducator", educatorData?.data);
  const theme = useTheme();

  const navigate = useNavigate();

  const handleViewEducator = (preferredEducator: string) => {
    navigate(`/educators/${preferredEducator}`);
  };

  return (
    <Box
      sx={{
        width: "300px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette.text.primary,
          mb: theme.spacing(2),
        }}
      >
        Preferred Educator
      </Typography>

      <Card
        sx={{
          boxShadow: theme.shadows[2],
          borderRadius: theme.shape.borderRadius,
          width: "210px",
          height: "210px",
        }}
      >
        <CardContent
          sx={{
            textAlign: "center",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Avatar
            src={educatorData?.data?.avatar}
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              mb: theme.spacing(1),
              border: `4px solid ${theme.palette.grey[200]}`,
              boxShadow: theme.shadows[2],
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: theme.spacing(1),
              mb: theme.spacing(1),
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.text.primary,
              }}
            >
              {educatorData?.data?.firstName +
                " " +
                educatorData?.data?.lastName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(0.5),
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: theme.typography.fontWeightMedium,
                  color: theme.palette.text.primary,
                }}
              >
                {educatorData?.data?.rating}
              </Typography>
              <Star sx={{ color: theme.palette.warning.main, fontSize: 20 }} />
            </Box>
          </Box>

          <Button
            variant="outlined"
            sx={{
              borderRadius: theme.shape.borderRadius,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: theme.typography.fontWeightMedium,
              textTransform: "none",
              px: theme.spacing(3),
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.main + "0a",
              },
            }}
            onClick={() => handleViewEducator(preferredEducator)}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
});

PreferredEducatorCard.displayName = "PreferredEducatorCard";
