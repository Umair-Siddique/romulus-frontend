import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { useUserContext } from "#context";
import { Box, Chip, Theme, Typography, useTheme } from "@mui/material";
import { OrganizationDetails } from "#pages/organization-details";
import { ReportInfo, ReportEvidence } from "#components/report-details";
import { useOne } from "@refinedev/core";
import { getStatusColor } from "#utils";

export const ReportDetails = () => {
  const theme = useTheme<Theme>();

  const { user } = useUserContext();

  const role = user?.role;

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const location = useLocation();

  const { id: reportId } = useParams();
  const { missionId, organizationId, educatorId } = location.state;

  const { data: reportData } = useOne({
    resource: `reports/${reportId}`,
    queryOptions: {
      enabled: !!reportId,
    },
  });

  const reportDetails = reportData?.data;
  console.log("reportDetails", reportDetails);

  return (
    <>
      <OrganizationDetails
        organizationIdProp={organizationId}
        parentComponent="reports"
        reportId={reportId}
      />
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontWeight: theme.typography.fontWeightMedium,
              color: theme.palette.grey[400],
              display: "flex",
              alignItems: "center",
              fontSize: theme.typography.h5.fontSize,
            }}
          >
            Reason & Evidence
          </Typography>
          <Chip
            label={reportDetails?.reportStatus}
            size="small"
            sx={{ ...getStatusColor(String(reportDetails?.reportStatus)) }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ReportInfo reportDetails={reportDetails} />
          <ReportEvidence reportDetails={reportDetails} />
        </Box>
      </Box>
    </>
  );
};
