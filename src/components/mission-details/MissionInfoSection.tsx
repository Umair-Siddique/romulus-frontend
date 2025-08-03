import { Box } from "@mui/material";
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
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
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
