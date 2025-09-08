import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function MyCalendar() {
  let events = [
    {
      title: "Conference",
      start: new Date(2025, 8, 15, 9, 0),
      end: new Date(2025, 8, 15, 17, 0),
      description: "",
      type: "",
      location: "",
      targetAudience: "",
      image: ""
    }
  ];

  return (
    <div className="Calendar-wrapper">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date(2025, 8, 1)}
        views={["month", "week", "day"]}
        style={{ height: "700px" }}
      />
    </div>
  );
}
