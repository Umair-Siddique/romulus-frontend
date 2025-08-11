import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Paper,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { RemoveRedEye as EyeIcon } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { formatDate, formatTime, getStatusColor } from "#utils";
import { useCreate, useMany, useUpdate } from "@refinedev/core";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useUserContext } from "#context";
import TableHeader from "./TableHeader";
import NoEducatorFound from "./NoEducatorFound";
import LoadingEducators from "./LoadingEducators";
import ReportModal from "./ReportModal";
import RehireModal from "./RehireModal";
import { CreateMissionModal } from "./create-mission-modal";

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

  const {
    mutate: createMission,
    data: missionsData,
    isLoading: isMissionLoading,
    isError: isMissionError,
  } = useCreate({
    resource: "missions",
    successNotification: false,
    errorNotification: false,
  });

  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEducatorId, setSelectedEducatorId] = useState<number | null>(
    null
  );
  const open = Boolean(anchorEl);

  // Modal state for reporting
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportingEducatorName, setReportingEducatorName] = useState("");
  const [reportEvidence, setReportEvidence] = useState<File | null>(null);

  // Modal state for rehiring
  const [rehireModalOpen, setRehireModalOpen] = useState(false);
  const [rehiringEducatorName, setRehiringEducatorName] = useState("");
  const [selectedMission, setSelectedMission] = useState("");

  // Modal state for creating mission
  const [modalOpen, setModalOpen] = useState(false);
  const [dataToSubmit, setDataToSubmit] = useState<any>(null);

  const { mutate: createReport } = useCreate({
    resource: "reports",
  });

  const { mutate: updateMission } = useUpdate({
    resource: "missions",
  });

  const { mutate: updateEducator } = useUpdate({
    resource: "educators",
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
    setRehiringEducatorName(educatorName);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReportEducator = (educatorId: number) => {
    setReportModalOpen(true);
    handleClose();
  };

  const handleRehireEducator = (educatorId: number) => {
    setRehireModalOpen(true);
    setSelectedEducatorId(educatorId);
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

  const handleCloseRehireModal = () => {
    setRehireModalOpen(false);
    setSelectedMission("");
    setRehiringEducatorName("");
  };

  const handleSubmitReport = () => {
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

    createReport({
      values: submitData,
      meta: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });

    handleCloseReportModal();
  };

  const handleSubmitRehire = () => {
    console.log("Rehire Data:", {
      educatorId: selectedEducatorId,
      missionId: selectedMission,
    });

    updateMission({
      id: selectedMission,
      values: {
        educatorId: selectedEducatorId!,
        status: "ongoing",
      },
    });

    updateEducator({
      id: selectedEducatorId!,
      values: {
        missionId: selectedMission,
        availableForHiring: false,
      },
    });

    handleCloseRehireModal();
  };

  const handleCreateNewMission = () => {
    setModalOpen(true);
    handleCloseRehireModal();
  };

  // Early return if no educators provided
  if (!educators || educators.length === 0) {
    return <NoEducatorFound theme={theme} COLUMN_WIDTHS={COLUMN_WIDTHS} />;
  }

  // Handle loading state
  if (isLoading) {
    return <LoadingEducators theme={theme} COLUMN_WIDTHS={COLUMN_WIDTHS} />;
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
      .filter((educator) => educator.id) || [];

  const handleViewEducator = (educatorId: number) => {
    navigate(`/educators/${educatorId}`, {
      state: { missionId },
    });
  };

  // Updated effect to handle mission creation with proper error handling
  useEffect(() => {
    if (dataToSubmit) {
      createMission(
        {
          values: dataToSubmit,
          meta: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
        {
          onSuccess: () => {
            setModalOpen(false);
          },
          onError: (error) => {
            console.error("Mission creation failed:", error);
            setDataToSubmit(null);
          },
        }
      );
    }
  }, [dataToSubmit]);

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
            <TableHeader theme={theme} COLUMN_WIDTHS={COLUMN_WIDTHS} />
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
                            View
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleRehireEducator(educator.id)}
                          >
                            Re-hire
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleReportEducator(educator.id)}
                          >
                            Report
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
      <ReportModal
        theme={theme}
        reportModalOpen={reportModalOpen}
        handleCloseReportModal={handleCloseReportModal}
        reportingEducatorName={reportingEducatorName}
        reportReason={reportReason}
        setReportReason={setReportReason}
        reportEvidence={reportEvidence}
        handleSubmitReport={handleSubmitReport}
        handleFileUpload={handleFileUpload}
      />

      {/* Rehire Modal */}
      <RehireModal
        theme={theme}
        rehireModalOpen={rehireModalOpen}
        handleCloseRehireModal={handleCloseRehireModal}
        educatorName={rehiringEducatorName}
        selectedMission={selectedMission}
        setSelectedMission={setSelectedMission}
        handleSubmitRehire={handleSubmitRehire}
        onCreateNewMission={handleCreateNewMission}
      />

      {/* Create Mission Modal */}
      <CreateMissionModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        educatorId={selectedEducatorId!}
        setDataToSubmit={setDataToSubmit}
      />
    </>
  );
};
