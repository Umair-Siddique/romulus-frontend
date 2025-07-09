import { MissionsTabProps } from "#types";
import { Box } from "@mui/material";
import { MissionCard } from "./MissionCard";
import { ToolBar } from "./tool-bar";
import { useEffect, useState } from "react";

export const MissionsTab = ({ missionsData }: MissionsTabProps) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredMissions, setFilteredMissions] = useState<any[]>([]);

  useEffect(() => {
    switch (selectedStatus) {
      case "All":
        setFilteredMissions(missionsData);
        break;
      case "Ongoing":
        setFilteredMissions(
          missionsData.filter((mission) => mission.status === "ongoing")
        );
        break;
      case "Completed":
        setFilteredMissions(
          missionsData.filter((mission) => mission.status === "completed")
        );
        break;
      case "Cancelled":
        setFilteredMissions(
          missionsData.filter((mission) => mission.status === "cancelled")
        );
        break;
      default:
        setFilteredMissions(missionsData);
    }
  }, [selectedStatus, missionsData]);

  return (
    <>
      {/* Toolbar */}
      <ToolBar
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        {/* Mission Cards */}
        {filteredMissions?.map((mission, index) => (
          <MissionCard key={index} {...mission} />
        ))}
      </Box>
    </>
  );
};
