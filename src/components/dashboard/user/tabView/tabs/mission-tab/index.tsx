import { Box } from "@mui/material";
import { MissionCard } from "./MissionCard";
import { ToolBar } from "./Toolbar";
import { useEffect, useState } from "react";
import { MissionsTabProps, MissionsTabsDataProps } from "#types";

export const MissionsTab = ({ missionsTabProps }: { missionsTabProps: MissionsTabProps }) => {
  const { missions, refetchMissions } = missionsTabProps;

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredMissions, setFilteredMissions] = useState<
    MissionsTabsDataProps[]
  >([]);

  useEffect(() => {
    switch (selectedStatus) {
      case "All":
        setFilteredMissions(missions);
        break;
      case "Pending":
        setFilteredMissions(
          missions.filter((mission) => mission.status === "pending")
        );
        break;
      case "Ongoing":
        setFilteredMissions(
          missions.filter((mission) => mission.status === "ongoing")
        );
        break;
      case "Completed":
        setFilteredMissions(
          missions.filter((mission) => mission.status === "completed")
        );
        break;
      default:
        setFilteredMissions(missions);
    }
  }, [selectedStatus, missions]);

  return (
    <Box sx={{ minHeight: "400px" }}>
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
        {filteredMissions?.map((mission: any, index) => (
          <MissionCard key={index} {...mission} refetch={refetchMissions} />
        ))}
      </Box>
    </Box>
  );
};
