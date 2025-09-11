const db = require("../db/firebaseSettings");

async function createEvent(name, dates, location, description, event_type, target_audience, old_id, image = null, metadata = null) {
    if ([name, dates, location, description, event_type, target_audience, old_id].some(x => x == null)) {
        console.log("Error here");
        return 1;
    }
    const snapshot = await db.ref('events').once('value');
    if (snapshot.exists()) {
        const obj = snapshot.val()
        const events = Object.entries(obj).map(([id, data]) => ({
            id,
            ...data
        }));
        const myStr = JSON.stringify(events, null, 0)
        const myObj = JSON.parse(myStr)
        for (const user of myObj){
            if (user.old_id === old_id){
                return 2;
            }
        }
    }
    await db.ref('events').once('value');
    const id = db.ref().push().key;
    await db.ref('events' + '/' + id).set({
        name:name,
        dates:dates,
        location:location,
        description:description,
        event_type:event_type,
        target_audience:target_audience,
        old_id:old_id,
        image:image,
        metadata:metadata
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