import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useUserContext } from "#context";

import {
  Groups as GroupsIcon,
  HourglassTop as HourglassTopIcon,
  CheckCircle as CheckCircleIcon,
  HighlightOff as HighlightOffIcon,
} from "@mui/icons-material";

import { KpiItem } from "#types";
import { KpiCards, PageMeta, TableComponent } from "#components";
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

  const {
    data: organizationsData,
    isLoading: isOrganizationsDataLoading,
    isError,
    refetch: refetchOrganizationsData,
  } = useList({
    resource: "organizations",
    queryOptions: {
      enabled: role === "admin",
    },
  });

  if (isOrganizationsDataLoading) {
    return "Loading...";
  }

  const organizations = organizationsData?.data;

  const organizationsArray = organizations?.map((organization) => ({
    id: organization._id,
    avatar: organization.avatar,
    name: organization.organizationName,
    createdAt: formatDate(organization.createdAt),
    siretNumber: organization.siretNumber,
    branches: organization.branches.length,
    status: organization.status,
  }));

  const kpis: KpiItem[] = [
    {
      title: "Total",
      total: organizationsArray?.length || 0,
      icon: <GroupsIcon sx={{ color: "#1976d2", fontSize: "1.5rem" }} />, // Blue 700
      iconBg: "#e3f2fd", // Blue 50
    },
    {
      title: "Pending",
      total:
        organizationsArray?.filter(
          (organization) => organization.status === "pending"
        ).length || 0,
      icon: <HourglassTopIcon sx={{ color: "#f57c00", fontSize: "1.5rem" }} />, // Orange 700
      iconBg: "#fff3e0", // Orange 50
    },
    {
      title: "Active",
      total:
        organizationsArray?.filter(
          (organization) => organization.status === "active"
        ).length || 0,
      icon: <CheckCircleIcon sx={{ color: "#2e7d32", fontSize: "1.5rem" }} />, // Green 800
      iconBg: "#e8f5e9", // Green 50
    },
    {
      title: "Inactive",
      total:
        organizationsArray?.filter(
          (organization) => organization.status === "inactive"
        ).length || 0,
      icon: <HighlightOffIcon sx={{ color: "#c62828", fontSize: "1.5rem" }} />, // Red 800
      iconBg: "#ffebee", // Red 50
    },
  ];

  const columnWidths = {
    name: "30%",
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

  return (
    <>
      <PageMeta
        title="Manage Organizations"
        description="Manage all organizations here"
      />
      <KpiCards kpiCardsData={kpis} />
      <Box sx={{ mt: 3 }}>
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
