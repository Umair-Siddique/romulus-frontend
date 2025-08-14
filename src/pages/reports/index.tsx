import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useUserContext } from "#context";
import { Box, Theme, useTheme } from "@mui/material";

import {
  Assignment as AssignmentIcon,
  HourglassTop as HourglassTopIcon,
  CheckCircle as CheckCircleIcon,
  HighlightOff as HighlightOffIcon,
} from "@mui/icons-material";

import { KpiItem } from "#types";
import {
  KpiCards,
  PageMeta,
  TableComponent,
  ToolBarComponent,
} from "#components";
import { useList } from "@refinedev/core";

export const Reports = () => {
  const { user } = useUserContext();

  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const { data, isLoading, isError } = useList({
    resource: "reports",
    queryOptions: {
      enabled: role === "admin",
    },
  });

  const reports = data?.data;

  // Available Filters
  const availableStatuses = ["All", "Open", "Resolved", "Dismissed"];
  const availableDates = ["Today", "This Week", "This Month", "All Time"];
  const [availableOrganizations, setAvailableOrganizations] = useState<
    string[]
  >([]);

  // Filters States
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Date");
  const [selectedOrganization, setSelectedOrganization] =
    useState("Organizations");

  // Set Available Branches and Organizations
  useEffect(() => {
    const uniqueOrganizations: string[] = Array.from(
      new Set(reports?.map((report: any) => report?.organizationName))
    );

    setAvailableOrganizations(uniqueOrganizations);
  }, [selectedOrganization, reports]);

  // Filtered Reports
  const [filteredReports, setFilteredReports] = useState<any>([]);

  useEffect(() => {
    let filtered = reports;

    // Filter by status
    if (selectedStatus !== "All") {
      filtered = filterByStatus(selectedStatus, reports!);
    }

    // Filter by date
    if (selectedDate !== "Date") {
      filtered = filterByDate(selectedDate, reports!);
    }

    setFilteredReports(filtered);
  }, [selectedStatus, selectedDate, reports]);

  if (isLoading) {
    return "Loading...";
  } else if (isError) {
    return "Error loading reports";
  }

  function filterByStatus(selectedStatus: string, reports: any[]) {
    return reports.filter((report) => {
      switch (selectedStatus) {
        case "Open":
          return report.reportStatus === "open";
        case "Resolved":
          return report.reportStatus === "resolved";
        case "Dismissed":
          return report.reportStatus === "dismissed";
        default:
          return true;
      }
    });
  }

  function filterByDate(selectedDate: string, reports: any[]) {
    const isDateInRange = (
      reportDate: string | Date,
      dateRange: string
    ): boolean => {
      if (!reportDate) return false;

      const reportDateTime = new Date(reportDate);
      const now = new Date();

      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const reportDay = new Date(
        reportDateTime.getFullYear(),
        reportDateTime.getMonth(),
        reportDateTime.getDate()
      );

      switch (dateRange) {
        case "Today":
          return reportDay.getTime() === today.getTime();

        case "This Week":
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return reportDay >= weekStart && reportDay <= weekEnd;

        case "This Month":
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          const monthEnd = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
          );
          return reportDay >= monthStart && reportDay <= monthEnd;

        case "All Time":
        case "Date":
          return true;

        default:
          return true;
      }
    };

    return reports.filter((report: any) =>
      isDateInRange(report.createdAt, selectedDate)
    );
  }

  const kpis: KpiItem[] = [
    {
      title: "Total",
      total: reports?.length || 0,
      icon: <AssignmentIcon sx={{ color: "#1976d2", fontSize: "1.5rem" }} />, // Blue 700
      iconBg: "#e3f2fd", // Blue 50
    },
    {
      title: "Open",
      total:
        reports?.filter((report: any) => report.reportStatus === "open")
          .length || 0,
      icon: <HourglassTopIcon sx={{ color: "#ef6c00", fontSize: "1.5rem" }} />, // Orange 800 (slightly deeper for contrast)
      iconBg: "#fff3e0", // Orange 50
    },
    {
      title: "Resolved",
      total:
        reports?.filter((report: any) => report.reportStatus === "resolved")
          .length || 0,
      icon: <CheckCircleIcon sx={{ color: "#1b5e20", fontSize: "1.5rem" }} />, // Green 900 for max contrast
      iconBg: "#e8f5e9", // Green 50
    },
    {
      title: "Dismissed",
      total:
        reports?.filter((report: any) => report.reportStatus === "dismissed")
          .length || 0,
      icon: <HighlightOffIcon sx={{ color: "#b71c1c", fontSize: "1.5rem" }} />, // Red 900 for max contrast
      iconBg: "#ffebee", // Red 50
    },
  ];

  const columnWidths = {
    reportedBy: "20%",
    createdAt: "20%",
    reportedEducator: "20%",
    reportReason: "20%",
    status: "10%",
    actions: "10%",
  };

  const headerData = [
    { id: "reportedBy", label: "Reported By" },
    { id: "createdAt", label: "Reported On" },
    { id: "reportedEducator", label: "Reported Educator" },
    { id: "reportReason", label: "Report Reason" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Actions" },
  ];

  const reportsArray = filteredReports?.map((report: any) => ({
    id: report._id,
    createdAt: report.createdAt,
    reportedBy: report.organizationName,
    reportedEducator: report.educatorName,
    reportReason: report.reportReason,
    status: report.reportStatus,
  }));

  return (
    <>
      <PageMeta title="Manage Reports" description="Manage all reports here" />
      <KpiCards kpiCardsData={kpis} />
      <Box sx={{ mt: 3 }}>
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
        />

        <TableComponent
          tableData={reportsArray}
          columnWidths={columnWidths}
          headerData={headerData}
          navigateTo="reports"
        />
      </Box>
    </>
  );
};
