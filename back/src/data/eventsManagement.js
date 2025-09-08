const db = require("../db/firebaseSettings");

async function createEvent(name, dates, location, description, event_type, target_audience) {
    if ([name, dates, location, description, event_type, target_audience].some(x => x == null)) {
        console.log("Error here");
        return 1;
    }
    await db.ref('events').once('value');
    const id = db.ref().push().key;
    await db.ref('events' + '/' + id).set({
        name:name,
        dates:dates,
        location:location,
        description:description,
        event_type:event_type,
        target_audience:target_audience
    });
    return id;
}

async function getEventListByPeriod(start, end) {
    const snapshot = await db.ref("events").once("value");
    let eventsList = [];
    if (snapshot.exists()) {
        const obj = snapshot.val();
        const events = Object.entries(obj).map(([id, data]) => ({
            id,
            ...data
        }));

        eventsList = events.filter(event => {
            return event.dates >= start && event.dates <= end;
        });
    } else {
        console.log("No events found");
    }
    return eventsList;
}

module.exports = {createEvent, getEventListByPeriod}