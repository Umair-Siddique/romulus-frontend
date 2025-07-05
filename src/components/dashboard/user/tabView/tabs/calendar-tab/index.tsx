import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import events from "./events";
import CustomToolbar from "./CustomToolbar";
import { MissionsModal } from "./MissionsModal";

moment.locale("en-GB");

export const CalendarTab = () => {
  const localizer = momentLocalizer(moment);
  const [open, setOpen] = useState(false);

  interface Mission {
    id: string;
    title: string;
    mission: string;
    status: "Ongoing" | "New" | "Completed" | "Pending";
  }

  const sampleMissions: Mission[] = [
    {
      id: "1",
      title: "The Learning Hub",
      mission: "English Speaking Session",
      status: "Ongoing",
    },
    {
      id: "2",
      title: "The Learning Hub",
      mission: "English Speaking Session",
      status: "New",
    },
    {
      id: "3",
      title: "The Learning Hub",
      mission: "English Speaking Session",
      status: "Ongoing",
    },
    {
      id: "4",
      title: "The Learning Hub",
      mission: "English Speaking Session",
      status: "New",
    },
    {
      id: "5",
      title: "The Learning Hub",
      mission: "English Speaking Session",
      status: "Ongoing",
    },
    {
      id: "6",
      title: "The Learning Hub",
      mission: "English Speaking Session",
      status: "New",
    },
  ];

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
        //   onSelectSlot={handleSelect}
        components={{
          toolbar: CustomToolbar,
        }}
      />
      <MissionsModal
        open={open}
        onClose={() => setOpen(false)}
        date="May 6, 2025"
        missions={sampleMissions}
      />
    </>
  );
};
