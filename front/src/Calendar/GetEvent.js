async function getData(startDate, endDate) {
  try {
    const response = await fetch('https://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        start: startDate,
        end: endDate
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Server responded!');

    return data;

  } catch (error) {
    console.error('Error:', error);
  }
}

function transformEvent(event) {
  return {
    title: event.title,
    start: event.date,
    end: new Date(
      event.date.getFullYear(),
      event.date.getMonth(),
      event.date.getDate(),
      17,
      0
    ),
    description: event.description,
    type: event.type,
    location: event.location,
    targetAudience: event.targetAudience,
  };
}

export async function updateEvents (startDate, endDate) {
  let rawEvents = await getData(startDate, endDate);

  if (!Array.isArray(rawEvents)) {
    rawEvents = [];
  }

  let events = rawEvents.map(transformEvent);

  return events;
}
