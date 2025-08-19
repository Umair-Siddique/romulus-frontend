import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useUserContext } from "#context";

import {
  Groups as GroupsIcon,
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
import { Box } from "@mui/material";
import { formatDate } from "#utils";

export const Organizations = () => {
  const { user } = useUserContext();

  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const { data } = useList({
    resource: "organizations",
    queryOptions: {
      enabled: role === "admin",
    },
  });

  const organizations = data?.data;

  // Available Filters
  const availableStatuses = ["All", "Pending", "Active", "Inactive"];
  const availableDates = ["Today", "This Week", "This Month", "All Time"];

  // Filters States
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Date");

  // Filtered Organizations
  const [filteredOrganizations, setFilteredOrganizations] = useState<any>([]);

  useEffect(() => {
    let filtered = organizations;

    // Filter by status
    if (selectedStatus !== "All") {
      filtered = filterByStatus(selectedStatus, organizations!);
    }

    // Filter by date
    if (selectedDate !== "Date") {
      filtered = filterByDate(selectedDate, organizations!);
    }

    setFilteredOrganizations(filtered);
  }, [selectedStatus, selectedDate, organizations]);

  function filterByStatus(selectedStatus: string, organizations: any[]) {
    return organizations.filter((organization) => {
      switch (selectedStatus) {
        case "Pending":
          return organization.status === "pending";
        case "Active":
          return organization.status === "active";
        case "Inactive":
          return organization.status === "inactive";
        default:
          return true;
      }
    });
  }

  function filterByDate(selectedDate: string, organizations: any[]) {
    const isDateInRange = (
      organizationDate: string | Date,
      dateRange: string
    ): boolean => {
      if (!organizationDate) return false;

      const organizationDateTime = new Date(organizationDate);
      const now = new Date();

      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const organizationDay = new Date(
        organizationDateTime.getFullYear(),
        organizationDateTime.getMonth(),
        organizationDateTime.getDate()
      );

      switch (dateRange) {
        case "Today":
          return organizationDay.getTime() === today.getTime();

        case "This Week":
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return organizationDay >= weekStart && organizationDay <= weekEnd;

        case "This Month":
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          const monthEnd = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
          );
          return organizationDay >= monthStart && organizationDay <= monthEnd;

        case "All Time":
        case "Date":
          return true;

        default:
          return true;
      }
    };

    return organizations.filter((organization: any) =>
      isDateInRange(organization.createdAt, selectedDate)
    );
  }

  const kpis: KpiItem[] = [
    {
      title: "Total",
      total: organizations?.length || 0,
      icon: <GroupsIcon sx={{ color: "#1976d2", fontSize: "1.5rem" }} />, // Blue 700
      iconBg: "#e3f2fd", // Blue 50
    },
    {
      title: "Pending",
      total:
        organizations?.filter(
          (organization: any) => organization.status === "pending"
        ).length || 0,
      icon: <HourglassTopIcon sx={{ color: "#f57c00", fontSize: "1.5rem" }} />, // Orange 700
      iconBg: "#fff3e0", // Orange 50
    },
    {
      title: "Active",
      total:
        organizations?.filter(
          (organization: any) => organization.status === "active"
        ).length || 0,
      icon: <CheckCircleIcon sx={{ color: "#2e7d32", fontSize: "1.5rem" }} />, // Green 800
      iconBg: "#e8f5e9", // Green 50
    },
    {
      title: "Inactive",
      total:
        organizations?.filter(
          (organization: any) => organization.status === "inactive"
        ).length || 0,
      icon: <HighlightOffIcon sx={{ color: "#c62828", fontSize: "1.5rem" }} />, // Red 800
      iconBg: "#ffebee", // Red 50
    },
  ];

  const columnWidths = {
    name: "20%",
    createdAt: "20%",
    siretNumber: "20%",
    branches: "20%",
    status: "10%",
    actions: "10%",
  };

  const headerData = [
    { id: "name", label: "Name" },
    { id: "createdAt", label: "Registered On" },
    { id: "siretNumber", label: "SIRET Number" },
    { id: "branches", label: "Branches" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Actions" },
  ];

  const organizationsArray = filteredOrganizations?.map(
    (organization: any) => ({
      id: organization._id,
      avatar: organization.avatar || "N/A",
      name: organization.organizationName || "N/A",
      createdAt: formatDate(organization.createdAt),
      siretNumber: organization.siretNumber || "N/A",
      branches: organization.branches.length,
      status: organization.status || "N/A",
    })
  );

  return (
    <>
      <PageMeta
        title="Manage & Monitor Organizations"
        description="Manage all organizations here"
      />
      <KpiCards kpiCardsData={kpis} />
      <Box sx={{ mt: 3 }}>
        <ToolBarComponent
          availableStatuses={availableStatuses}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          availableDates={availableDates}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <TableComponent
          tableData={organizationsArray}
          columnWidths={columnWidths}
          headerData={headerData}
          navigateTo="organizations"
        />
      </Box>
    </>
  );
};
