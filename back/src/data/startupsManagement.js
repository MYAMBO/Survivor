const db = require("../db/firebaseSettings");

async function createStartup(name, legal_status, address, email, phone, sector, maturity, password) {
    if ([name, legal_status, address, email, phone, sector, maturity, password].some(x => x == null)) {
        console.log("Error here");
        return 1;
    }
    const snapshot = await db.ref('startups').once('value');
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
    await db.ref('startups' + '/' + id).set({
        name: name,
        legal_status: legal_status,
        address: address,
        email: email,
        phone: phone,
        sector: sector,
        maturity: maturity,
        password: password
    });
    return 0;
}

async function getStartupList() {
    const snapshot = await db.ref('startups').once('value');
    if (snapshot.exists()) {
        const obj = snapshot.val()
        const startups = Object.entries(obj).map(([id, data]) => ({
            id,
            name: data.name,
            sector: data.sector,
            maturity: data.maturity,
            location: data.address
        }));
        return startups;
    } else {
        console.log("Not found")
    }
}

async function GetStartupInformationsById(id) {
    const snapshot = await db.ref('startups').once('value');
    if (snapshot.exists()) {
        const obj = snapshot.val()
        const startups = Object.entries(obj).map(([id, data]) => ({
            id,
            ...data
        }));
        const myStr = JSON.stringify(startups, null, 0)
        const myObj = JSON.parse(myStr)
        for (const startup of myObj){
            if (startup.id === id){
                const { password, ...startupWithoutPassword } = startup;
                return startupWithoutPassword;
            }
        }
    } else {
        console.log("Not found")
    }
}

module.exports = {createStartup, getStartupList, GetStartupInformationsById}