import { useNavigate } from "react-router";
import { Box, Button } from "@mui/material";
import { useUpdate } from "@refinedev/core";
import { useEffect, useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";
import { useJsApiLoader } from "@react-google-maps/api";

import { useUserContext } from "#context";
import { BranchModal } from "#components/table-component/BranchModal";
import { PageMeta, TableComponent, ToolBarComponent } from "#components";

export const Branches = () => {
  const theme = useTheme<Theme>();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

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

  const [showBranchMenu, setShowBranchMenu] = useState(false);

  // Filters States
  const [selectedDate, setSelectedDate] = useState("Date");
  const [selectedStatus, setSelectedStatus] = useState("All");

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

  const { mutate: updateOrganization } = useUpdate({
    resource: "organizations",
  });

  const { organizationId } = user;

  const handleAddBranch = (branchData: any) => {
    const formData = new FormData();

    Object.keys(branchData).forEach((key) => {
      formData.append(key, branchData[key]);
    });

    updateOrganization({
      id: organizationId,
      values: {
        ...Object.fromEntries(formData.entries()),
      },
      meta: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
  };

  const columnWidths = {
    branchName: "20%",
    createdAt: "20%",
    email: "20%",
    phone: "20%",
    status: "10%",
    actions: "10%",
  };

  const headerData = [
    { id: "branchName", label: "Branche" },
    { id: "createdAt", label: "Enregistré le" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Téléphone" },
    { id: "status", label: "Statut" },
    { id: "actions", label: "Actions" },
  ];

  const branchesArray = filteredBranches?.map((branch: any) => ({
    id: branch?._id,
    branchName: branch?.branchName || "N/A",
    createdAt: branch?.createdAt,
    email: branch?.branchEmail || "N/A",
    phone: branch?.branchPhone || "N/A",
    city: branch?.branchCity || "N/A",
    country: branch?.branchCountry || "N/A",
    address: branch?.branchAddress || "N/A",
    residenceGuidelines: branch?.residenceGuidelines || "N/A",
    status: branch?.branchStatus || "N/A",
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageMeta
          title="Manage & Monitor Branches"
          description="Manage all branches here"
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowBranchMenu(true)}
        >
          Ajouter une branche
        </Button>
      </Box>
      <Box
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          mt: 3,
          p: 2,
        }}
      >
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
          menuOptions={["Edit Branch", "Inactive Branch", "Activate Branch"]}
        />
      </Box>

      {isLoaded && (
        <BranchModal
          open={showBranchMenu}
          onClose={() => setShowBranchMenu(false)}
          onSave={handleAddBranch}
        />
      )}
    </>
  );
};
