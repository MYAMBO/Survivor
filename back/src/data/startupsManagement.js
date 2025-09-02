const db = require("../db/firebaseSettings");

async function createStartup(name, legal_status, address, email, phone, sector, maturity) {
    if ([name, legal_status, address, email, phone, sector, maturity].some(x => x == null)) {
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
        maturity: maturity
    });
    return 0;
}

module.exports = createStartup