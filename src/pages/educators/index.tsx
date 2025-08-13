import { useEffect } from "react";
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
import { KpiCards, PageMeta } from "#components";
import { useList } from "@refinedev/core";
import { formatDate } from "#utils";
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

  const { data: educatorsData, isLoading: isEducatorsDataLoading } = useList({
    resource: "educators",
    queryOptions: {
      enabled: role === "admin",
    },
  });

  if (isEducatorsDataLoading) {
    return "Loading...";
  }

  const educators = educatorsData?.data;

  // console.log("Educators -> educatorsData:", educatorsData);

  const educatorsArray = educators?.map((educator) => ({
    id: educator?._id,
    avatar: educator?.avatar,
    name: `${educator?.firstName} ${educator?.lastName}`,
    createdAt: formatDate(educator?.createdAt),
    email: educator?.user?.email,
    phone: educator?.user?.phone,
    status: educator?.status,
  }));

  // console.log("Educators -> educatorsArray:", educatorsArray);
  const kpis: KpiItem[] = [
    {
      title: "Total",
      total: educatorsArray?.length || 0,
      icon: <GroupsIcon sx={{ color: "#1976d2", fontSize: "1.5rem" }} />, // Blue 700
      iconBg: "#e3f2fd", // Blue 50
    },
    {
      title: "Pending",
      total:
        educatorsArray?.filter((educator) => educator?.status === "pending")
          .length || 0,
      icon: <HourglassTopIcon sx={{ color: "#f57c00", fontSize: "1.5rem" }} />, // Orange 700
      iconBg: "#fff3e0", // Orange 50
    },
    {
      title: "Active",
      total:
        educatorsArray?.filter((educator) => educator?.status === "active")
          .length || 0,
      icon: <CheckCircleIcon sx={{ color: "#2e7d32", fontSize: "1.5rem" }} />, // Green 800
      iconBg: "#e8f5e9", // Green 50
    },
    {
      title: "Inactive",
      total:
        educatorsArray?.filter((educator) => educator?.status === "inactive")
          .length || 0,
      icon: <HighlightOffIcon sx={{ color: "#c62828", fontSize: "1.5rem" }} />, // Red 800
      iconBg: "#ffebee", // Red 50
    },
  ];

  const columnWidths = {
    name: "30%",
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

  return (
    <>
      <PageMeta
        title="Manage Educators"
        description="Manage all educators here"
      />
      <KpiCards kpiCardsData={kpis} />
      <Box sx={{ mt: 3 }}>
        <TableComponent
          tableData={educatorsArray}
          columnWidths={columnWidths}
          headerData={headerData}
          navigateTo="educators"
        />
      </Box>
    </>
  );
};
