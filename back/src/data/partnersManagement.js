const db = require("../db/firebaseSettings");

async function createPartner(email, name, legal_status, address, phone, created_at, description, partnership_type) {
    if ([email, name, legal_status, address, phone, created_at, description, partnership_type].some(x => x == null)) {
        console.log("Error here");
        return 1;
    }
    const snapshot = await db.ref('partners').once('value');
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
    await db.ref('partners' + '/' + id).set({
        name:name,
        legal_status:legal_status,
        address:address,
        email:email,
        phone:phone,
        created_at:created_at,
        description:description,
        partnership_type:partnership_type
    });
    return id;
}

module.exports = {createPartner}