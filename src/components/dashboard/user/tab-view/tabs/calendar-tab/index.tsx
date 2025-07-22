import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { Toolbar } from "./Toolbar";
import { MissionsModal } from "./MissionsModal";

moment.locale("en-GB");

export const CalendarTab = ({ calendarTabProps }: any) => {
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); // Add this state
  const [selectedDateMissions, setSelectedDateMissions] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [availableBranches, setAvailableBranches] = useState<string[]>([]);
  const [filteredMissions, setFilteredMissions] = useState<any[]>([]);

  const calendarMissionList = calendarTabProps?.map((mission: any) => ({
    id: mission._id,
    title: mission.title,
    organizationName: mission.organizationName,
    branchName: mission.branchName,
    date: mission.date,
    status: mission.status,
  }));

  useEffect(() => {
    const branches: string[] = Array.from(
      new Set(
        calendarMissionList.map(
          (mission: any) => mission.branchName || "No Branch"
        )
      )
    );
    setAvailableBranches(["All Branches", ...branches]);
  }, [calendarTabProps]);

  // console.log("calendar-tab -> availableBranches:", availableBranches);

  useEffect(() => {
    let filtered = calendarTabProps;

    if (selectedBranch !== "All Branches" && selectedBranch !== "Branches") {
      filtered = filtered.filter(
        (mission: any) => mission.branchName === selectedBranch
      );
    }

    setFilteredMissions(filtered);
  }, [selectedBranch, calendarTabProps]);

  // console.log("calendar-tab -> selectedBranch:", selectedBranch);
  // console.log("calendar-tab -> calendarMissionList:", calendarMissionList);

  useEffect(() => {
    let filtered = calendarMissionList;

    // Apply branch filter
    if (selectedBranch !== "All Branches" && selectedBranch !== "Branches") {
      filtered = filtered.filter(
        (mission: any) => mission.branchName === selectedBranch
      );
    }

    setFilteredMissions(filtered);
  }, [selectedBranch]);

  // console.log("calendar-tab -> filteredMissions:", filteredMissions);

  const missionsByDate = filteredMissions?.reduce(
    (acc: any, mission: any) => {
      const dateKey = moment(mission.date).format("YYYY-MM-DD");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(mission);
      return acc;
    },
    {} as Record<string, typeof calendarMissionList>
  );

  // console.log("calendar-tab -> missionsByDate:", missionsByDate);

  // Transform grouped missions into calendar events
  const events =
    missionsByDate &&
    Object.entries(missionsByDate).map(([dateKey, missions]: any) => {
      const missionCount = missions.length;
      const eventDate = moment(dateKey).toDate();

      return {
        id: dateKey,
        title: `${missionCount} Mission${missionCount > 1 ? "s" : ""}`,
        start: eventDate,
        end: eventDate,
        missions: missions,
      };
    });

  const handleMissionSelect = (event: any) => {
    setSelectedDateMissions(event.missions);
    setOpen(true);
  };

  return (
    <>
      <Calendar
        selectable
        localizer={localizer}
        date={currentDate}
        defaultView="month"
        views={["month"]} // lock to month view only
        events={events}
        style={{ height: "100vh" }}
        onSelectEvent={handleMissionSelect}
        onNavigate={(date) => {
          setCurrentDate(date); // Update current date when navigating
        }}
        components={{
          toolbar: (toolbarProps) => (
            <Toolbar
              {...toolbarProps}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              availableBranches={availableBranches}
            />
          ),
        }}
      />
      <MissionsModal
        open={open}
        onClose={() => setOpen(false)}
        date={
          selectedDateMissions.length > 0
            ? moment(selectedDateMissions[0].date).format("MMMM D, YYYY")
            : ""
        }
        missions={selectedDateMissions}
      />
    </>
  );
};
