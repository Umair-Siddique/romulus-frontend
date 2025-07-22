import { Box } from "@mui/material";
import { MissionCard } from "./MissionCard";
import { ToolBar } from "./Toolbar";
import { useEffect, useState } from "react";
import { MissionsTabProps, MissionsTabsDataProps } from "#types";

export const MissionsTab = ({
  missionsTabProps,
}: {
  missionsTabProps: MissionsTabProps;
}) => {
  const { missions, refetchMissions } = missionsTabProps;
  const [selectedDate, setSelectedDate] = useState("All Time");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredMissions, setFilteredMissions] = useState<
    MissionsTabsDataProps[]
  >([]);

  // Helper function to check if a date falls within the selected date range
  const isDateInRange = (
    missionDate: string | Date,
    dateRange: string
  ): boolean => {
    if (!missionDate || dateRange === "All Time") return true;

    const missionDateTime = new Date(missionDate);
    const now = new Date();

    // Reset time to start of day for accurate comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const missionDay = new Date(
      missionDateTime.getFullYear(),
      missionDateTime.getMonth(),
      missionDateTime.getDate()
    );

    switch (dateRange) {
      case "Today":
        return missionDay.getTime() === today.getTime();

      case "This Week":
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)
        return missionDay >= weekStart && missionDay <= weekEnd;

      case "This Month":
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return missionDay >= monthStart && missionDay <= monthEnd;

      case "All Time":
        return true;

      default:
        return true;
    }
  };

  // Combined filter effect that handles all filters together
  useEffect(() => {
    let filtered = missions;

    // Apply status filter
    if (selectedStatus !== "All") {
      filtered = filtered.filter((mission) => {
        switch (selectedStatus) {
          case "Pending":
            return mission.status === "pending";
          case "Ongoing":
            return mission.status === "ongoing";
          case "Completed":
            return mission.status === "completed";
          default:
            return true;
        }
      });
    }

    // Apply date filter
    filtered = filtered.filter((mission: any) =>
      isDateInRange(
        mission.createdAt || mission.startDate || mission.date,
        selectedDate
      )
    );

    setFilteredMissions(filtered);
  }, [selectedStatus, selectedDate, missions]);

  return (
    <Box sx={{ minHeight: "400px" }}>
      {/* Toolbar */}
      <ToolBar
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
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
