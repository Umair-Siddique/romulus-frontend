import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import events from "./events";
import CustomToolbar from "./CustomToolbar";
import { MissionsModal } from "./MissionsModal";

moment.locale("en-GB");

interface CalendarTabProps {
  missions: any[]; // Define the type of missions if known
}

export const CalendarTab = ({ missions }: CalendarTabProps) => {
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = useState(false);

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
        defaultDate={new Date()}
        defaultView="month"
        views={["month"]} // lock to month view only
        events={events}
        style={{ height: "100vh" }}
        onSelectEvent={handleMissionSelect}
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
