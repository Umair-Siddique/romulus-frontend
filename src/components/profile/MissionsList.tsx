import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import { MissionsTable } from "./MissionsTable";
import { ToolBarComponent } from "#components";
import { useTheme, Theme } from "@mui/material/styles";

export const MissionsList = ({ missions }: { missions: any }) => {
  const theme = useTheme<Theme>();

  // Available Filters
  const availableStatuses = ["All", "Pending", "Ongoing", "Completed"];
  const availableDates = ["Today", "This Week", "This Month", "All Time"];
  const [availableOrganizations, setAvailableOrganizations] = useState<
    string[]
  >([]);
  const [availableBranches, setAvailableBranches] = useState<string[]>([]);

  // Filters States
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Date");
  const [selectedOrganization, setSelectedOrganization] =
    useState("Organizations");
  const [selectedBranch, setSelectedBranch] = useState("Branches");

  // Filtered Missions
  const [filteredMissions, setFilteredMissions] = useState<any>([]);

  // Set Available Branches and Organizations
  useEffect(() => {
    const uniqueOrganizations: string[] = Array.from(
      new Set(
        missions?.map((mission: any) => mission?.organization?.organizationName)
      )
    );

    setAvailableOrganizations(uniqueOrganizations);

    const uniqueBranches: string[] = Array.from(
      new Set(
        missions
          ?.filter(
            (mission: any) =>
              mission?.organization?.organizationName === selectedOrganization
          )
          ?.map((mission: any) => mission?.branch)
      )
    );

    setAvailableBranches(uniqueBranches);
  }, [selectedOrganization, missions]);

  useEffect(() => {
    let filtered = missions;

    // Filter by status
    if (selectedStatus !== "All") {
      filtered = filterByStatus(selectedStatus, missions);
    }

    // Filter by date
    if (selectedDate !== "Date") {
      filtered = filterByDate(selectedDate, missions);
    }

    // Filter by organization
    if (selectedOrganization !== "Organizations") {
      filtered = filterByOrganization(selectedOrganization, missions);
    }

    // Filter by branch
    if (selectedBranch !== "Branches") {
      filtered = filterByBranch(selectedBranch, missions);
    }

    setFilteredMissions(filtered);
  }, [
    selectedStatus,
    selectedOrganization,
    selectedBranch,
    selectedDate,
    missions,
  ]);

  function filterByStatus(selectedStatus: string, missions: any[]) {
    return missions.filter((mission) => {
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

  function filterByDate(selectedDate: string, missions: any[]) {
    const isDateInRange = (
      missionDate: string | Date,
      dateRange: string
    ): boolean => {
      if (!missionDate) return false;

      const missionDateTime = new Date(missionDate);
      const now = new Date();

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
          weekStart.setDate(today.getDate() - today.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return missionDay >= weekStart && missionDay <= weekEnd;

        case "This Month":
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          const monthEnd = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
          );
          return missionDay >= monthStart && missionDay <= monthEnd;

        case "All Time":
        case "Date":
          return true;

        default:
          return true;
      }
    };

    return missions.filter((mission: any) =>
      isDateInRange(
        mission.createdAt || mission.startDate || mission.date,
        selectedDate
      )
    );
  }

  function filterByOrganization(selectedOrganization: string, missions: any[]) {
    return missions.filter(
      (mission: any) =>
        mission?.organization?.organizationName === selectedOrganization
    );
  }

  function filterByBranch(selectedBranch: string, missions: any[]) {
    return missions.filter((mission: any) => mission.branch === selectedBranch);
  }

  return (
    <Box sx={{ m: theme.spacing(2) }}>
      <ToolBarComponent
        availableStatuses={availableStatuses}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        availableDates={availableDates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        availableOrganizations={availableOrganizations}
        selectedOrganization={selectedOrganization}
        setSelectedOrganization={setSelectedOrganization}
        availableBranches={availableBranches}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />
      <MissionsTable missions={filteredMissions} />
    </Box>
  );
};
