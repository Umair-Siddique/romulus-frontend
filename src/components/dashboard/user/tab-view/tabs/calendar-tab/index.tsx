import { useEffect, useState, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";

import { Toolbar } from "./Toolbar";
import { MissionsModal } from "./MissionsModal";

moment.locale("en-GB");

export const CalendarTab = ({ calendarTabProps }: any) => {
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateMissions, setSelectedDateMissions] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("All Branches");

  // Transform raw data once
  const calendarMissionList = useMemo(
    () =>
      calendarTabProps?.map((mission: any) => ({
        id: mission._id,
        title: mission.title,
        organizationName: mission.organizationName,
        branchName: mission.branchName,
        date: mission.date,
        status: mission.status,
      })) || [],
    [calendarTabProps]
  );

  // Get available branches
  const availableBranches = useMemo(() => {
    const branches: string[] = Array.from(
      new Set(
        calendarMissionList.map(
          (mission: any) => mission.branchName || "No Branch"
        )
      )
    );
    return ["All Branches", ...branches];
  }, [calendarMissionList]);

  // Filter missions based on selected branch
  const filteredMissions = useMemo(() => {
    if (selectedBranch === "All Branches" || selectedBranch === "Branches") {
      return calendarMissionList;
    }
    return calendarMissionList.filter(
      (mission: any) => mission.branchName === selectedBranch
    );
  }, [selectedBranch, calendarMissionList]);

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
      const startDate = moment(dateKey).startOf('day').toDate();
      const endDate = moment(dateKey).endOf('day').toDate();

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