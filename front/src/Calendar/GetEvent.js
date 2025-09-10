import { format } from "date-fns";

async function getData(startDate, endDate) {
  try {
    const start = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    const end = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

    console.log(`Sending POST from ${start} to ${end}`);

    const response = await fetch(`http://localhost:3000/events?start=${start}&end=${end}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Server responded!', data);

    const events = Array.isArray(data) 
      ? data 
      : (Array.isArray(data.events) ? data.events : []);

    return events;

  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}


function transformEvent(event) {
  return {
    title: event.name,
    start: new Date(event.dates),
    end: new Date(event.dates),
    description: event.description,
    type: event.event_type,
    location: event.location,
    target_audience: event.target_audience,
  };
}


export async function updateEvents (startDate, endDate) {
  let rawEvents = await getData(startDate, endDate);

  if (!Array.isArray(rawEvents)) {
    rawEvents = [];
  }
  
  let events = rawEvents.map(transformEvent);
  
  console.log(events);

  return events;
}
