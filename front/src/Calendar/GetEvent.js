async function getData(startDate, endDate) {
  try {
    const response = await fetch('https://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        start: startDate,
        end: endDate,
        userId: 1
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

export default function updateEvents (startDate, endDate) {
  let rawEvents = getData(startDate, endDate);

  let events = ""/*rawEvents.map(transfromEvent)*/;
}
