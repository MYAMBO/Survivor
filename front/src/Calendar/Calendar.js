import React, { useState } from "react";
import './Calendar.css'

const CalendarSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const numDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    let days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null); // empty slots before first day
    }
    for (let i = 1; i <= numDays; i++) {
      days.push(i);
    }
    return days;
  };

  const days = generateCalendar();

  return (
    <div className="calendar">
      <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
      <div className="calendar-grid">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="calendar-day header">{d}</div>
        ))}
        {days.map((day, idx) => (
          <div key={idx} className="calendar-day">{day || ""}</div>
        ))}
      </div>
    </div>
  );
};

function Calendar() {
  return (
    <div className="Calendar-wrapper">
      <div className="title" >

      </div>
      <div className="calendar">
        <CalendarSection/>
      </div>
    </div>
  )
}

export default Calendar;
