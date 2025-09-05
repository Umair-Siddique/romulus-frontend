import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useUserContext } from "#context";

import {
  Groups as GroupsIcon,
  HourglassTop as HourglassTopIcon,
  CheckCircle as CheckCircleIcon,
  HighlightOff as HighlightOffIcon,
} from "@mui/icons-material";

import { Box } from "@mui/material";

import { KpiItem } from "#types";
import { KpiCards, PageMeta, ToolBarComponent } from "#components";
import { useList } from "@refinedev/core";
import { formatDate } from "#lib";
import { TableComponent } from "#components";

export const Educators = () => {
  const { user } = useUserContext();

  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const { data } = useList({
    resource: "educators",
    queryOptions: {
      enabled: role === "admin",
    },
  });

  const educators = data?.data;

  // Available Filters
  const availableStatuses = ["All", "Pending", "Active", "Inactive"];
  const availableDates = ["Today", "This Week", "This Month", "All Time"];

  // Filters States
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Date");

  // Filtered Educators
  const [filteredEducators, setFilteredEducators] = useState<any>([]);

  useEffect(() => {
    let filtered = educators;

    // Filter by status
    if (selectedStatus !== "All") {
      filtered = filterByStatus(selectedStatus, educators!);
    }

    // Filter by date
    if (selectedDate !== "Date") {
      filtered = filterByDate(selectedDate, educators!);
    }

    setFilteredEducators(filtered);
  }, [selectedStatus, selectedDate, educators]);

  function filterByStatus(selectedStatus: string, educators: any[]) {
    return educators.filter((educator) => {
      switch (selectedStatus) {
        case "Pending":
          return educator.status === "pending";
        case "Active":
          return educator.status === "active";
        case "Inactive":
          return educator.status === "inactive";
        default:
          return true;
      }
    });
  }

  function filterByDate(selectedDate: string, educators: any[]) {
    const isDateInRange = (
      educatorDate: string | Date,
      dateRange: string
    ): boolean => {
      if (!educatorDate) return false;

      const educatorDateTime = new Date(educatorDate);
      const now = new Date();

      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const educatorDay = new Date(
        educatorDateTime.getFullYear(),
        educatorDateTime.getMonth(),
        educatorDateTime.getDate()
      );

      switch (dateRange) {
        case "Today":
          return educatorDay.getTime() === today.getTime();

        case "This Week":
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return educatorDay >= weekStart && educatorDay <= weekEnd;

        case "This Month":
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          const monthEnd = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
          );
          return educatorDay >= monthStart && educatorDay <= monthEnd;

        case "All Time":
        case "Date":
          return true;

        default:
          return true;
      }
    };

    return educators.filter((educator: any) =>
      isDateInRange(educator.createdAt, selectedDate)
    );
  }

  const kpis: KpiItem[] = [
    {
      title: "Total",
      total: educators?.length || 0,
      icon: <GroupsIcon sx={{ color: "#1976d2", fontSize: "1.5rem" }} />, // Blue 700
      iconBg: "#e3f2fd", // Blue 50
    },
    {
      title: "Pending",
      total:
        educators?.filter((educator) => educator?.status === "pending")
          .length || 0,
      icon: <HourglassTopIcon sx={{ color: "#f57c00", fontSize: "1.5rem" }} />, // Orange 700
      iconBg: "#fff3e0", // Orange 50
    },
    {
      title: "Active",
      total:
        educators?.filter((educator) => educator?.status === "active").length ||
        0,
      icon: <CheckCircleIcon sx={{ color: "#2e7d32", fontSize: "1.5rem" }} />, // Green 800
      iconBg: "#e8f5e9", // Green 50
    },
    {
      title: "Inactive",
      total:
        educators?.filter((educator) => educator?.status === "inactive")
          .length || 0,
      icon: <HighlightOffIcon sx={{ color: "#c62828", fontSize: "1.5rem" }} />, // Red 800
      iconBg: "#ffebee", // Red 50
    },
  ];

  const columnWidths = {
    name: "20%",
    createdAt: "20%",
    email: "20%",
    phone: "20%",
    status: "10%",
    actions: "10%",
  };

  const headerData = [
    { id: "name", label: "Name" },
    { id: "createdAt", label: "Registered On" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Actions" },
  ];

  const educatorsTableData = filteredEducators?.map((educator: any) => ({
    id: educator?._id,
    avatar: educator?.avatar || "N/A",
    name: `${educator?.firstName} ${educator?.lastName}` || "N/A",
    createdAt: formatDate(educator?.createdAt),
    email: educator?.user?.email || "N/A",
    phone: educator?.user?.phone || "N/A",
    status: educator?.status || "N/A",
  }));

  return (
    <>
      <PageMeta
        title="Manage & Monitor Educators"
        description="Manage all educators here"
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
          tableData={educatorsTableData}
          columnWidths={columnWidths}
          headerData={headerData}
          navigateTo="educators"
        />
      </Box>
    </>
  );
};
