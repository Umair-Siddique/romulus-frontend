import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo } from "react";
import { MissionDetails } from "./MissionDetails";
import { PreferredEducatorCard } from "./PreferredEducatorCard";

export const MissionInfoSection = memo(
  ({
    missionData,
    getStatusColor,
  }: {
    missionData: any;
    getStatusColor: (status: string) => any;
  }) => {
    const theme = useTheme();

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: theme.spacing(2),
        }}
      >
        <MissionDetails
          missionData={missionData}
          getStatusColor={getStatusColor}
        />

        {missionData.hasPreferredEducator && (
          <PreferredEducatorCard
            preferredEducator={missionData.preferredEducator}
          />
        )}
      </Box>
    );
  }
);

MissionInfoSection.displayName = "MissionInfoSection";
