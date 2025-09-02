const db = require("../db/firebaseSettings");

async function writeUserData(tableName, name, email) {
    if (tableName == null || name == null || email == null){
        console.log("Error here");
        return;
    }
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
            if (user.username === name){
                console.log("already exist");
                return;
            }
        }
    } else {
        console.log("Creating a new table")
    }
    const id = db.ref().push().key;
    db.ref(tableName + '/' + id).set({
        username: name,
        email: email,
    })
}

async function readUserData(tableName) {
    const snapshot = await db.ref(tableName).once('value');
    if (snapshot.exists()) {
        const obj = snapshot.val()
        const users = Object.entries(obj).map(([id, data]) => ({
            id,
            ...data
        }));
        const myStr = JSON.stringify(users, null, 0)
        const myObj = JSON.parse(myStr)
        myObj.forEach(user => {
            console.log(user.email)
        })
    } else {
        console.log("Not found")
    }
}

async function findUserData(tableName, id) {
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
            if (user.username === id){
                console.log(user.email);
                return;
            }
        }
    } else {
        console.log("Not found")
    }
}

module.exports = {writeUserData, readUserData, findUserData};