import { Box } from "@mui/material";
import { MissionCard } from "./MissionCard";
import { ToolBar } from "./Toolbar";
import { useEffect, useState } from "react";
import { MissionsTabProps, MissionsTabsDataProps } from "#types";

export const MissionsTab = ({ missionsTabProps }: MissionsTabProps) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredMissions, setFilteredMissions] = useState<
    MissionsTabsDataProps[]
  >([]);

  useEffect(() => {
    switch (selectedStatus) {
      case "All":
        setFilteredMissions(missionsTabProps);
        break;
      case "Ongoing":
        setFilteredMissions(
          missionsTabProps.filter((mission) => mission.status === "ongoing")
        );
        break;
      case "Pending":
        setFilteredMissions(
          missionsTabProps.filter((mission) => mission.status === "pending")
        );
        break;
      case "Completed":
        setFilteredMissions(
          missionsTabProps.filter((mission) => mission.status === "completed")
        );
        break;
      case "Cancelled":
        setFilteredMissions(
          missionsTabProps.filter((mission) => mission.status === "cancelled")
        );
        break;
      default:
        setFilteredMissions(missionsTabProps);
    }
  }, [selectedStatus, missionsTabProps]);

  console.log("Filtered Missions:", filteredMissions);

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
