import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import CustomToolbar from "./CustomToolbar";
import { MissionsModal } from "./MissionsModal";

import { CalendarTabProps } from "#types";

moment.locale("en-GB");

const events = [
  {
    id: 14,
    title: "3 Missions",
    start: new Date(new Date().setHours(new Date().getHours() - 1)),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  },
];

export const CalendarTab = ({ missions }: CalendarTabProps) => {
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); // Add this state

  const handleMissionSelect = (event: any) => {
    // Handle the event selection logic here
    console.log("Selected Event:", event);
    setOpen(true);
  };

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
        date="May 6, 2025"
        missions={missions}
      />
    </>
  );
};
