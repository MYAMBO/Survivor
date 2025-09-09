const db = require("../db/firebaseSettings");

async function findUserDataByEmail(tableName, email) {
    const snapshot = await db.ref(tableName).once('value');
    if (snapshot.exists()) {
        const obj = snapshot.val()
        const users = Object.entries(obj).map(([id, data]) => ({
            id,
            ...data
        }));
        const myStr = JSON.stringify(users, null, 0)
        const myObj = JSON.parse(myStr)
        for (const user of myObj){
            if (user.email === email){
                return user;
            }
        }
    } else {
        console.log("Not found")
    }
}

module.exports = {findUserDataByEmail}