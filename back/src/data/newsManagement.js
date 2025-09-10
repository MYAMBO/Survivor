const db = require("../db/firebaseSettings");

async function createNews(news_date, location, title, category, old_id, startup_id="", description="", image = null, metadata = null) {
    if ([news_date, location, title, category, startup_id, description, old_id].some(x => x == null)) {
        console.log("Error here");
        return 1;
    }
    const snapshot = await db.ref('news').once('value');
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
    await db.ref('news').once('value');
    const id = db.ref().push().key;
    await db.ref('news' + '/' + id).set({
        news_date:news_date,
        location:location,
        title:title,
        category:category,
        startup_id:startup_id,
        description:description,
        old_id:old_id,
        image:image,
        metadata:metadata
    });
    return id;
}

module.exports = {createNews}