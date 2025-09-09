import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, endOfWeek } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import {updateEvents} from "./GetEvent.js"

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CustomToolbar = (props) => {
  return (
    <div className="toolbar-wrapper">
      <div className="today-wrapper">
        <button className="toolbar-button" onClick={() => props.onNavigate('TODAY')}>Today</button>
      </div>
      <div className="toolbar-navigation-wrapper">
        <button className="toolbar-button toolbar-navigation-button" onClick={() => props.onNavigate('PREV')}>◀</button>
        <span>{props.label}</span>
        <button className="toolbar-button toolbar-navigation-button" onClick={() => props.onNavigate('NEXT')}>▶</button>
      </div>
      <div className="time-period-wrapper">
        <button className="toolbar-button" onClick={() => props.onView('month')}>Month</button>
        <button className="toolbar-button" onClick={() => props.onView('week')}>Week</button>
        <button className="toolbar-button" onClick={() => props.onView('day')}>Day</button>
      </div>
    </div>
  )
}

export default function MyCalendar() {
  const [events, setEvents] = useState([]);

  const handleRangeChange = (range, view) => {
    let start, end;

    if (Array.isArray(range)) {
      start = range[0];
      end = range[range.length - 1];
    } else if (range.start && range.end) {
      start = range.start;
      end = range.end;
    } else {
      start = startOfWeek(new Date());
      end = endOfWeek(new Date());
    }
    setEvents(updateEvents(start, end));
  };

  return (
    <div className="Calendar-wrapper">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date(2025, 8, 1)}
        views={["month", "week", "day"]}
        components={{
          toolbar: CustomToolbar,
        }}
        events={events}
        onRangeChange={handleRangeChange}
        style={{ height: "700px" }}
      />
    </div>
  );
}
