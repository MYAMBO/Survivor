const db = require("../db/firebaseSettings");

async function createNews(news_date, location, title, category, startup_id="", description="") {
    if ([news_date, location, title, category, startup_id, description].some(x => x == null)) {
        console.log("Error here");
        return 1;
    }
    await db.ref('news').once('value');
    const id = db.ref().push().key;
    await db.ref('news' + '/' + id).set({
        news_date:news_date,
        location:location,
        title:title,
        category:category,
        startup_id:startup_id,
        description:description
    });
    return id;
}

module.exports = {createNews}