import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ToolBar } from "./Toolbar";
import { MissionsTable } from "./MissionsTable";

export const MissionsList = ({ missions }: { missions: any }) => {
  const [selectedDate, setSelectedDate] = useState("Date");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedBranch, setSelectedBranch] = useState("Branches");
  const [availableBranches, setAvailableBranches] = useState<string[]>([]);
  const [selectedOrganization, setSelectedOrganization] =
    useState("Organization");
  const [availableOrganizations, setAvailableOrganizations] = useState<
    string[]
  >([]);
  const [filteredMissions, setFilteredMissions] = useState([]);

  useEffect(() => {
    const organizationsWithMissionsArray = Array.from(
      new Set(
        missions?.map((mission: any, index: number, self: any) => {
          const output: any = {
            organizationName: mission.organizationName,
            branches: [],
          };

          if (self[index].organizationName === mission.organizationName) {
            output.branches.push(mission.branchName);
          }

          return output;
        })
      )
    );

    const sortedOrganizationsWithMissionsArray: any =
      organizationsWithMissionsArray?.sort((a: any, b: any) =>
        a.organizationName.localeCompare(b.organizationName, undefined, {
          sensitivity: "base",
        })
      );

    const organizations: any = Array.from(
      new Set(missions?.map((mission: any) => mission.organizationName))
    );

    let availableBranches = [];

    for (let i = 0; i < sortedOrganizationsWithMissionsArray.length; i++) {
      if (
        sortedOrganizationsWithMissionsArray[i].organizationName ===
        selectedOrganization
      ) {
        availableBranches.push(
          sortedOrganizationsWithMissionsArray[i].branches[0]
        );
      }
    }

    setAvailableOrganizations(["All Organizations", ...organizations]);

    availableBranches = Array.from(new Set(availableBranches));

    setAvailableBranches(["All Branches", ...availableBranches]);
  }, [missions, selectedOrganization]);

  // Helper function to check if a date falls within the selected date range
  const isDateInRange = (
    missionDate: string | Date,
    dateRange: string
  ): boolean => {
    if (!missionDate) return false;

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
      case "Date":
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
      filtered = filtered.filter((mission: any) => {
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

    // Apply branch filter
    if (selectedBranch !== "All Branches" && selectedBranch !== "Branches") {
      filtered = filtered.filter(
        (mission: any) => mission.branchName === selectedBranch
      );
    }

    // Apply organization filter
    if (
      selectedOrganization !== "All Organizations" &&
      selectedOrganization !== "Organization"
    ) {
      filtered = filtered.filter(
        (mission: any) => mission.organizationName === selectedOrganization
      );
    }

    // Apply date filter
    if (selectedDate !== "Date") {
      filtered = filtered.filter((mission: any) =>
        isDateInRange(
          mission.createdAt || mission.startDate || mission.date,
          selectedDate
        )
      );
    }

    setFilteredMissions(filtered);
  }, [selectedStatus, selectedBranch, selectedDate, missions]);

  // console.log("MissionList -> missions:", filteredMissions);

  return (
    <Box>
      <ToolBar
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
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
