import moment from "moment";
import { Box } from "@mui/material";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Lock as LockIcon } from "@mui/icons-material";

import "moment/locale/en-gb";

import { Toolbar } from "./Toolbar";
import { useUserContext } from "#context";
import { MissionsModal } from "./MissionsModal";
import { Modal } from "#components/Modal";

moment.locale("en-GB");

const localizer = momentLocalizer(moment);

export const CalendarTab = ({ calendarTabProps }: any) => {
  const { userProfile } = useUserContext();
  const navigate = useNavigate();

  const { trainingStatus } = userProfile || {};

  const [openMissionsModal, setOpenMissionsModal] = useState(false);
  const [openTrainingModal, setOpenTrainingModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateMissions, setSelectedDateMissions] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [selectedOrganization, setSelectedOrganization] =
    useState("All Organizations");

  // Transform raw data once
  const calendarMissionList = useMemo(
    () =>
      calendarTabProps?.map((mission: any) => ({
        id: mission?._id,
        title: mission?.title,
        organizationName: mission?.organization?.organizationName,
        branchName: mission?.branch,
        date: mission?.start,
        status: mission?.status,
      })) || [],
    [calendarTabProps]
  );

  // Get available organizations
  const availableOrganizations = useMemo(() => {
    const organizations: string[] = Array.from(
      new Set(
        calendarMissionList.map(
          (mission: any) => mission.organizationName || "No Organization"
        )
      )
    );
    return ["All Organizations", ...organizations.sort()];
  }, [calendarMissionList]);

  // Get available branches based on selected organization
  const availableBranches = useMemo(() => {
    let filteredMissions = calendarMissionList;

    // Filter by organization first if not "All Organizations"
    if (selectedOrganization !== "All Organizations") {
      filteredMissions = calendarMissionList.filter(
        (mission: any) => mission.organizationName === selectedOrganization
      );
    }

    const branches: string[] = Array.from(
      new Set(
        filteredMissions.map(
          (mission: any) => mission.branchName || "No Branch"
        )
      )
    );
    return ["All Branches", ...branches.sort()];
  }, [calendarMissionList, selectedOrganization]);

  // Filter missions based on selected organization and branch
  const filteredMissions = useMemo(() => {
    let filtered = calendarMissionList;

    // Apply organization filter
    if (selectedOrganization !== "All Organizations") {
      filtered = filtered.filter(
        (mission: any) => mission.organizationName === selectedOrganization
      );
    }

    // Apply branch filter
    if (selectedBranch !== "All Branches") {
      filtered = filtered.filter(
        (mission: any) => mission.branchName === selectedBranch
      );
    }

    return filtered;
  }, [selectedOrganization, selectedBranch, calendarMissionList]);

  // Group missions by date
  const missionsByDate = useMemo(() => {
    return filteredMissions.reduce((acc: any, mission: any) => {
      const dateKey = moment(mission.date).format("YYYY-MM-DD");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(mission);
      return acc;
    }, {} as Record<string, typeof calendarMissionList>);
  }, [filteredMissions]);

  // Transform grouped missions into calendar events
  const events =
    missionsByDate &&
    Object.entries(missionsByDate).map(([dateKey, missions]: any) => {
      const missionCount = missions.length;

      // Create proper start and end dates for all-day events
      const startDate = moment(dateKey).startOf("day").toDate();
      const endDate = moment(dateKey).endOf("day").toDate();

      return {
        id: dateKey,
        title: `${missionCount} Mission${missionCount > 1 ? "s" : ""}`,
        start: startDate,
        end: endDate,
        allDay: true,
        missions: missions,
      };
    });

  const handleMissionSelect = (event: any) => {
    if (trainingStatus === "pending") {
      setOpenTrainingModal(true);
      return;
    }
    setSelectedDateMissions(event.missions);
    setOpenMissionsModal(true);
  };

  // Reset branch filter when organization changes
  const handleOrganizationChange = (organization: string) => {
    setSelectedOrganization(organization);
    setSelectedBranch("All Branches"); // Reset branch when organization changes
  };

  return (
    <Box sx={{ height: "100vh", m: 2 }}>
      <Calendar
        selectable
        localizer={localizer}
        date={currentDate}
        defaultView="month"
        views={["month"]}
        events={events}
        style={{ height: "100vh" }}
        onSelectEvent={handleMissionSelect}
        onNavigate={(date) => {
          setCurrentDate(date);
        }}
        components={{
          toolbar: (toolbarProps) => (
            <Toolbar
              {...toolbarProps}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              availableBranches={availableBranches}
              selectedOrganization={selectedOrganization}
              setSelectedOrganization={handleOrganizationChange}
              availableOrganizations={availableOrganizations}
            />
          ),
          month: {
            event: (eventProps) => (
              <div className="event-box" tabIndex={0}>
                {eventProps.event.title}
              </div>
            ),
          },
        }}
      />
      <MissionsModal
        open={openMissionsModal}
        onClose={() => setOpenMissionsModal(false)}
        date={
          selectedDateMissions.length > 0
            ? moment(selectedDateMissions[0].date).format("MMMM D, YYYY")
            : ""
        }
        missions={selectedDateMissions}
      />
      <Modal
        open={openTrainingModal}
        onClose={() => setOpenTrainingModal(false)}
        title="Missions Locked"
        description="You need to complete your training before you can view or accept missions. Training helps you understand how the mission system works and prepares you to work with partner organizations."
        hasButton={true}
        hasButton1={true}
        onSubmit={() => setOpenTrainingModal(false)}
        button1OnClick={() => navigate("/training")}
        buttonText="Close"
        button1Text="Start Training"
        icon={<LockIcon />}
      />
    </Box>
  );
};
