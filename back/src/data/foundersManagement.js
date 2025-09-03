const db = require("../db/firebaseSettings");

async function createFounder(email) {
    if ([email].some(x => x == null)) {
        console.log("Error here");
        return 1;
    }
    const snapshot = await db.ref('founders').once('value');
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
                return 2;
            }
        }
    }
    const id = db.ref().push().key;
    await db.ref('founders' + '/' + id).set({
        email:email
    });
    return id;
}

module.exports = createFounder