import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "#context";
import { Box } from "@mui/material";
import { PageMeta, TableComponent, ToolBarComponent } from "#components";
import { formatDate } from "#lib";

export const Branches = () => {
  const { user, userProfile } = useUserContext();

  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const branches = userProfile?.branches;

  const availableStatuses = ["All", "Active", "Inactive"];
  const availableDates = ["Today", "This Week", "This Month", "All Time"];

  // Filters States
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Date");

  // Filtered Branches
  const [filteredBranches, setFilteredBranches] = useState<any>([]);

  useEffect(() => {
    let filtered = branches;

    // Filter by status
    if (selectedStatus !== "All") {
      filtered = filterByStatus(selectedStatus, branches!);
    }

    // Filter by date
    if (selectedDate !== "Date") {
      filtered = filterByDate(selectedDate, branches!);
    }

    setFilteredBranches(filtered);
  }, [selectedStatus, selectedDate, branches]);

  function filterByStatus(selectedStatus: string, branches: any[]) {
    return branches.filter((branch) => {
      switch (selectedStatus) {
        case "Active":
          return branch.branchStatus === "active";
        case "Inactive":
          return branch.branchStatus === "inactive";
        default:
          return true;
      }
    });
  }

  function filterByDate(selectedDate: string, branches: any[]) {
    const isDateInRange = (
      branchDate: string | Date,
      dateRange: string
    ): boolean => {
      if (!branchDate) return false;

      const branchDateTime = new Date(branchDate);
      const now = new Date();

      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const branchDay = new Date(
        branchDateTime.getFullYear(),
        branchDateTime.getMonth(),
        branchDateTime.getDate()
      );

      switch (dateRange) {
        case "Today":
          return branchDay.getTime() === today.getTime();

        case "This Week":
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return branchDay >= weekStart && branchDay <= weekEnd;

        case "This Month":
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          const monthEnd = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
          );
          return branchDay >= monthStart && branchDay <= monthEnd;

        case "All Time":
        case "Date":
          return true;

        default:
          return true;
      }
    };

    return branches.filter((branch: any) =>
      isDateInRange(branch.createdAt, selectedDate)
    );
  }

  const branchesArray = filteredBranches?.map((branch: any) => ({
    id: branch?._id,
    name: branch?.branchName || "N/A",
    createdAt: formatDate(branch?.createdAt),
    email: branch?.branchEmail || "N/A",
    phone: branch?.branchPhone || "N/A",
    city: branch?.branchCity || "N/A",
    country: branch?.branchCountry || "N/A",
    address: branch?.branchAddress || "N/A",
    residenceGuidelines: branch?.residenceGuidelines || "N/A",
    status: branch?.branchStatus || "N/A",
  }));

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

  return (
    <>
      {" "}
      <PageMeta
        title="Manage & Monitor Branches"
        description="Manage all branches here"
      />
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
          tableData={branchesArray}
          columnWidths={columnWidths}
          headerData={headerData}
          menuOptions={["Edit Branch", "Inactive Branch"]}
        />
      </Box>
    </>
  );
};
