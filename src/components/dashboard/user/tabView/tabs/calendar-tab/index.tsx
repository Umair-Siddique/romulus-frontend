import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import CustomToolbar from "./CustomToolbar";
import { MissionsModal } from "./MissionsModal";

import { CalendarTabProps } from "#types";

moment.locale("en-GB");

export const CalendarTab = ({ calendarTabProps }: CalendarTabProps) => {
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); // Add this state
  const [selectedDateMissions, setSelectedDateMissions] = useState<any[]>([]);

  const calendarMissionList = calendarTabProps.map((mission) => ({
    id: mission.id,
    title: mission.title,
    organizationName: mission.organizationName,
    branchName: mission.branchName,
    date: mission.date,
    status: mission.status,
  }));

  const missionsByDate = calendarMissionList.reduce((acc, mission) => {
    const dateKey = moment(mission.date).format("YYYY-MM-DD");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(mission);
    return acc;
  }, {} as Record<string, typeof calendarMissionList>);

  // Transform grouped missions into calendar events
  const events = Object.entries(missionsByDate).map(([dateKey, missions]) => {
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
    console.log("Selected Event:", event);
    setSelectedDateMissions(event.missions);
    setOpen(true);
  };

  console.log("Calendar Mission List:", calendarMissionList);
  console.log("Events:", events);

  return (
    <>
      <Calendar
        selectable
        localizer={localizer}
        defaultDate={currentDate}
        defaultView="month"
        views={["month"]} // lock to month view only
        events={events}
        style={{ height: "100vh" }}
        onSelectEvent={handleMissionSelect}
        onNavigate={(date) => {
          setCurrentDate(date); // Update current date when navigating
        }}
        components={{
          toolbar: CustomToolbar,
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
