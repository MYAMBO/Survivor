import { Calendar, dateFnsLocalizer, Toolbar as DefaultToolbar } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import {updateEvents} from "./GetEvent"

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
  //let startDate = "";
  //let endDate = "";
  //updateEvents(startDate, endDate);
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
        style={{ height: "700px" }}
      />
    </div>
  );
}
