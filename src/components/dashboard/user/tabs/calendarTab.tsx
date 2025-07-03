import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
export const CalendarTab: React.FC = () => {
  const theme = useTheme<Theme>();
  const [eventsData, setEventsData] = useState(events);
  const localizer = momentLocalizer(moment);

  const handleSelect = ({ start, end }: any) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
      ]);
  };

  return (
    <>
      <Calendar
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        views={["month"]} // lock to month view only
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </>
  );
};
