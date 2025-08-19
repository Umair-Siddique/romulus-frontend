import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "#context";
import { Box, Theme, useTheme } from "@mui/material";
import { PageMeta } from "#components";

export const Branches = () => {
  const theme = useTheme<Theme>();

  const { user, userProfile } = useUserContext();

  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "organization") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  console.log("Branches -> branches:", userProfile?.branches);

  return (
    <>
      {" "}
      <PageMeta
        title="Manage & Monitor Branches"
        description="Manage all branches here"
      />
      {/* <Box sx={{ mt: 3 }}>
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
      </Box> */}
    </>
  );
};
