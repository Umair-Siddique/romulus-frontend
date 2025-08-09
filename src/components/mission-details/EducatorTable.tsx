import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Paper,
  Typography,
  Box,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import {
  RemoveRedEye as EyeIcon,
  CloudUpload as UploadIcon,
  Flag as FlagIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { formatDate, formatTime, getStatusColor } from "#utils";
import { useCreate, useMany } from "@refinedev/core";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { useState } from "react";
import { useUserContext } from "#context";

interface Data {
  id: number;
  name: string;
  avatar: string;
  responseTime: string;
  status: string;
}

// Fixed column widths
const COLUMN_WIDTHS = {
  educator: 150,
  responseTime: 200,
  status: 150,
  actions: 150,
};

// Common table header component
const TableHeader = ({ theme }: { theme: Theme }) => (
  <TableHead>
    <TableRow
      sx={{
        backgroundColor: theme.palette.grey[50],
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          borderBottom: `1px solid ${theme.palette.divider}`,
          width: COLUMN_WIDTHS.educator,
          minWidth: COLUMN_WIDTHS.educator,
        }}
      >
        Educator
      </TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          width: COLUMN_WIDTHS.responseTime,
          minWidth: COLUMN_WIDTHS.responseTime,
        }}
      >
        Response Time
      </TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          width: COLUMN_WIDTHS.status,
          minWidth: COLUMN_WIDTHS.status,
        }}
      >
        Status
      </TableCell>
      <TableCell
        align="center"
        sx={{
          fontWeight: theme.typography.fontWeightBold,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
          width: COLUMN_WIDTHS.actions,
          minWidth: COLUMN_WIDTHS.actions,
        }}
      >
        Actions
      </TableCell>
    </TableRow>
  </TableHead>
);

export const EducatorTable = ({
  educators,
  missionId,
  tableType,
}: {
  educators: string[];
  missionId: string;
  tableType: "invited" | "hired";
}) => {
  const theme = useTheme<Theme>();
  const navigate = useNavigate();
  const { user, userProfile } = useUserContext();
  const organizationId = user?.organizationId;
  const organizationName = userProfile?.organizationName;

  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEducatorId, setSelectedEducatorId] = useState<number | null>(
    null
  );
  const open = Boolean(anchorEl);

  // Modal state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportingEducatorName, setReportingEducatorName] = useState("");
  const [reportEvidence, setReportEvidence] = useState<File | null>(null);

  const { mutate } = useCreate({
    resource: "reports",
  });

  const { data: educatorsData, isLoading } = useMany({
    resource: "educators",
    ids: educators,
    queryOptions: {
      enabled: educators.length > 0,
    },
  });

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    educatorId: number,
    educatorName: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedEducatorId(educatorId);
    setReportingEducatorName(educatorName);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReportEducator = (educatorId: number) => {
    setReportModalOpen(true);
    handleClose();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Check file type
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG, PNG, and PDF files are allowed");
        return;
      }

      setReportEvidence(file);
    }
  };

  const handleCloseReportModal = () => {
    setReportModalOpen(false);
    setReportReason("");
    setReportingEducatorName("");
    setReportEvidence(null);
  };

  const handleSubmitReport = () => {
    // Log all the report data to console
    console.log("Report Data:", {
      educatorId: selectedEducatorId,
      organizationId: organizationId,
      missionId: missionId,
      educatorName: reportingEducatorName,
      organizationName: organizationName,
      reportReason: reportReason.trim(),
      reportProof: reportEvidence
        ? {
            name: reportEvidence.name,
            size: reportEvidence.size,
            type: reportEvidence.type,
            file: reportEvidence, // The actual file object
          }
        : null,
      reportStatus: "pending",
      timestamp: new Date().toISOString(),
    });

    const educatorId = selectedEducatorId?.toString();

    const submitData = new FormData();
    submitData.append("educatorId", educatorId!);
    submitData.append("organizationId", organizationId!);
    submitData.append("missionId", missionId!);
    submitData.append("educatorName", reportingEducatorName);
    submitData.append("organizationName", organizationName);
    submitData.append("reportReason", reportReason.trim());
    submitData.append("reportProof", reportEvidence!);
    submitData.append("reportStatus", "pending");
    submitData.append("timestamp", new Date().toISOString());

    mutate({
      values: submitData,
      meta: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });

    handleCloseReportModal();
  };

  // Early return if no educators provided
  if (!educators || educators.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.default,
          borderRadius: theme.shape.borderRadius,
          overflow: "hidden",
        }}
      >
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ width: "100%", tableLayout: "fixed" }}>
            <TableHeader theme={theme} />
            <TableBody>
              <TableRow
                sx={{
                  backgroundColor: theme.palette.background.default,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <TableCell
                  colSpan={4}
                  sx={{
                    textAlign: "center",
                    padding: theme.spacing(3),
                    width: "100%",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    No educators found
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.default,
          borderRadius: theme.shape.borderRadius,
          overflow: "hidden",
        }}
      >
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ width: "100%", tableLayout: "fixed" }}>
            <TableHeader theme={theme} />
            <TableBody>
              <TableRow
                sx={{
                  backgroundColor: theme.palette.background.default,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <TableCell
                  colSpan={4}
                  sx={{
                    textAlign: "center",
                    padding: theme.spacing(3),
                    width: "100%",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Loading educators...
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  const data: Data[] =
    educatorsData?.data
      ?.map((educator: any) => ({
        id: educator?._id,
        name:
          `${educator?.firstName} ${educator?.lastName}` || "Unknown Educator",
        avatar: educator?.avatar || "/api/placeholder/40/40",
        responseTime: educator?.missionsInvitedFor?.find(
          (mission: any) => mission?.mission?._id === missionId
        )?.responseTime
          ? `${formatDate(
              educator?.missionsInvitedFor
                ?.find((mission: any) => mission?.mission?._id === missionId)
                ?.responseTime?.split("T")[0]
            )} - ${formatTime(
              educator?.missionsInvitedFor
                ?.find((mission: any) => mission?.mission?._id === missionId)
                ?.responseTime?.split("T")[1]
                .split(".")[0]
            )}`
          : "—",
        status:
          educator?.missionsInvitedFor?.find(
            (mission: any) => mission?.mission?._id === missionId
          )?.invitationStatus || "Status Unavailable",
      }))
      .filter((educator) => educator.id) || []; // Filter out educators without valid IDs

  // console.log("EducatorTable.tsx -> data:", data);

  const handleViewEducator = (educatorId: number) => {
    navigate(`/educators/${educatorId}`, {
      state: { missionId },
    });
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.default,
          borderRadius: theme.shape.borderRadius,
          overflow: "hidden",
        }}
      >
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ width: "100%", tableLayout: "fixed" }}>
            <TableHeader theme={theme} />
            <TableBody>
              {data.map((educator) => (
                <TableRow
                  key={educator.id}
                  hover
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      padding: theme.spacing(2),
                      width: COLUMN_WIDTHS.educator,
                      minWidth: COLUMN_WIDTHS.educator,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: theme.spacing(2),
                      }}
                    >
                      <Avatar
                        src={educator.avatar}
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                        }}
                      >
                        {educator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: theme.typography.fontWeightMedium,
                          color: theme.palette.text.primary,
                        }}
                      >
                        {educator.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      padding: theme.spacing(2),
                      width: COLUMN_WIDTHS.responseTime,
                      minWidth: COLUMN_WIDTHS.responseTime,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {educator.responseTime}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      padding: theme.spacing(2),
                      width: COLUMN_WIDTHS.status,
                      minWidth: COLUMN_WIDTHS.status,
                    }}
                  >
                    <Chip
                      label={educator.status}
                      size="small"
                      sx={{
                        ...getStatusColor(educator.status),
                        fontWeight: theme.typography.fontWeightMedium,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      padding: theme.spacing(2),
                      width: COLUMN_WIDTHS.actions,
                      minWidth: COLUMN_WIDTHS.actions,
                    }}
                  >
                    {tableType === "invited" ? (
                      <IconButton
                        size="small"
                        onClick={() => handleViewEducator(educator.id)}
                        sx={{
                          color: theme.palette.text.secondary,
                          "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        <EyeIcon />
                      </IconButton>
                    ) : (
                      <>
                        <IconButton
                          size="small"
                          aria-controls="menu"
                          aria-haspopup="true"
                          onClick={(e) =>
                            handleClick(e, educator.id, educator.name)
                          }
                          sx={{
                            color: theme.palette.text.secondary,
                            "&:hover": {
                              backgroundColor: theme.palette.action.hover,
                              color: theme.palette.primary.main,
                            },
                          }}
                        >
                          <GridMoreVertIcon />
                        </IconButton>
                        <Menu
                          id="menu"
                          anchorEl={anchorEl}
                          open={open && selectedEducatorId === educator.id}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            onClick={() => handleViewEducator(educator.id)}
                          >
                            View Educator
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleReportEducator(educator.id)}
                          >
                            Report Educator
                          </MenuItem>
                        </Menu>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Report Modal */}
      <Modal
        open={reportModalOpen}
        onClose={handleCloseReportModal}
        aria-labelledby="report-modal-title"
        aria-describedby="report-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 650,
            bgcolor: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            p: 4,
          }}
        >
          {/* Flag Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <FlagIcon
              sx={{
                fontSize: 48,
                color: "#ff4444",
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            id="report-modal-title"
            variant="h3"
            component="h3"
            align="center"
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            Report {reportingEducatorName}
          </Typography>

          {/* Description */}
          <Typography
            id="report-modal-description"
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{
              mb: 3,
              lineHeight: 1.5,
            }}
          >
            You are reporting {reportingEducatorName} for an issue that occurred
            during a session. Please describe clearly what happened and attach
            any relevant evidence. This report will be reviewed by the Romulus
            admin team and kept confidential.
          </Typography>

          {/* Add Reason Label */}
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              fontWeight: "medium",
            }}
          >
            Add Reason*
          </Typography>

          {/* Reason TextField */}
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write here..."
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
            }}
          />

          {/* Upload Evidence Label */}
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              fontWeight: "medium",
            }}
          >
            Upload Evidence
          </Typography>

          {/* Upload Area */}
          <Box
            sx={{
              border: "2px dashed",
              borderColor: "divider",
              borderRadius: 1,
              p: 3,
              textAlign: "center",
              mb: 3,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
            onClick={() =>
              document.getElementById("file-upload-input")?.click()
            }
          >
            <input
              id="file-upload-input"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <UploadIcon
              sx={{
                fontSize: 32,
                color: theme.palette.primary.main,
                mb: 1,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "medium",
                mb: 0.5,
              }}
            >
              {reportEvidence ? reportEvidence.name : "Upload"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Accepted formats: JPG, PNG, PDF (Max: 5MB)
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              onClick={handleCloseReportModal}
              sx={{
                minWidth: 100,
                color: theme.palette.primary.main,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitReport}
              disabled={!reportReason.trim()}
              sx={{
                minWidth: 120,
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Submit Report
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
