import { MissionsTabProps } from "#types";
import { Box } from "@mui/material";
import { MissionCard } from "./MissionCard";
import { ToolBar } from "./tool-bar";

export const MissionsTab = ({ missionsData }: MissionsTabProps) => {
  console.log("Missions Data:", missionsData);
  return (
    <>
      {/* Toolbar */}
      <ToolBar />

      <Box sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 5,
      }}>
        {/* Mission Cards */}
        {missionsData?.map((mission, index) => (
          <MissionCard key={index} {...mission} />
        ))}
      </Box>
    </>
  );
};
