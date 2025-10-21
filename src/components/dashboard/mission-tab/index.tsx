import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

import { MissionCard } from "./MissionCard";
import { MissionsTabsDataProps } from "#types";
import { ToolBarComponent } from "#components";
import { useCustomMutation } from "@refinedev/core";
import { useUserContext } from "#context";
import { formatDate, formatTime } from "#lib";

const convertToCSV = (jsonArray: any[]) => {
  if (!jsonArray || jsonArray.length === 0) return "";

  const keys = Object.keys(jsonArray[0]);
  const header = keys.join(",");

  const rows = jsonArray.map((row) =>
    keys
      .map((key) => {
        const val = row[key] ?? "";
        return `"${String(val).replace(/"/g, '""')}"`; // escape quotes
      })
      .join(",")
  );

  return [header, ...rows].join("\n");
};

// --- Download Utility
const downloadCSV = (jsonArray: any[], filename = "invoices.csv") => {
  const csv = convertToCSV(jsonArray);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const MissionsTab = ({
  missionsTabProps,
}: {
  missionsTabProps: any;
}) => {
  const { missions, refetchMissions } = missionsTabProps;

  const { user } = useUserContext();

  const { role } = user || {};

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
  const [filteredMissions, setFilteredMissions] = useState<
    MissionsTabsDataProps[]
  >([]);

  // Set Available Branches and Organizations
  useEffect(() => {
    const uniqueOrganizations: string[] = Array.from(
      new Set(
        missions.map((mission: any) => mission?.organization?.organizationName)
      )
    );

    setAvailableOrganizations(uniqueOrganizations);

    const uniqueBranches: string[] = Array.from(
      new Set(
        missions
          .filter(
            (mission: any) =>
              mission?.organization?.organizationName === selectedOrganization
          )
          .map((mission: any) => mission?.branch)
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

  const missionsData = filteredMissions?.map((mission: any, index: number) => ({
    _id: mission?._id,
    title: mission?.title,
    organizationName: mission?.organization?.organizationName,
    branchName: mission?.branch,
    date: mission?.start,
    time:
      `${formatTime(
        `${mission?.start?.split("T")[1].split(":")[0]}:${
          mission?.start?.split("T")[1].split(":")[1]
        }`
      )} to ${formatTime(
        `${mission?.end?.split("T")[1].split(":")[0]}:${
          mission?.end?.split("T")[1].split(":")[1]
        }`
      )}` || "N/A",
    branchAddress: mission?.organization?.branches?.find(
      (branch: any) => branch.branchName === mission?.branch
    )?.branchAddress,
    hiredEducator:
      mission?.hiredEducators && mission?.hiredEducators.length > 0
        ? mission?.hiredEducators[0]
        : [],
    status: mission?.status,
  }));

  const { mutateAsync, data } = useCustomMutation();

  const generateInvoice = () => {
    const rawInvoiceData = missionsData?.map((mission) => ({
      ...mission,
      time: `${formatTime(
        mission?.time?.split("-")[0]?.trim()
      )} to ${formatTime(mission?.time?.split("-")[1]?.trim())}`,
      date: formatDate(mission?.date),
    }));
    mutateAsync({
      url: "invoices/generate",
      method: "post",
      values: { missionsData: rawInvoiceData },
    });
  };

  useEffect(() => {
    if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
      downloadCSV(data.data, "invoices.csv");
    }
  }, [data?.data]);

  return (
    <Box sx={{ m: 2 }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
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
        {role === "admin" && selectedStatus === "Completed" && (
          <Button
            variant="contained"
            onClick={generateInvoice}
            sx={{
              ml: 2,
              mb: 3,
              width: "180px",
              textTransform: "none",
            }}
          >
            Generate Invoice
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        {/* Mission Cards */}
        {missionsData?.map((mission: any, index) => (
          <MissionCard
            key={index}
            mission={mission}
            refetch={() => refetchMissions(filteredMissions)}
          />
        ))}
      </Box>
    </Box>
  );
};
