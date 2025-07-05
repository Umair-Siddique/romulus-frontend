import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import CustomToolbar from "./CustomToolbar";

moment.locale("en-GB");

export const CalendarTab = () => {
  const [eventsData, setEventsData] = useState(events);
  const localizer = momentLocalizer(moment);

  const handleMissionSelect = (event: any) => {
    // Handle the event selection logic here
    console.log("Selected Event:", event);
  };

  return (
    <Calendar
      selectable
      localizer={localizer}
      defaultDate={new Date()}
      defaultView="month"
      views={["month"]} // lock to month view only
      events={eventsData}
      style={{ height: "100vh" }}
      onSelectEvent={handleMissionSelect}
      //   onSelectSlot={handleSelect}
      components={{
        toolbar: CustomToolbar,
      }}
    />
  );
};
