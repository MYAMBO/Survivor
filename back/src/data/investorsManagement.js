const db = require("../db/firebaseSettings");

async function createInvestor(email, name="", legal_status="", address="", phone="", created_at="", description="", investor_type="", investment_focus="") {
    if ([email].some(x => x == null)) {
        console.log("Error here");
        return 1;
    }
    const snapshot = await db.ref('investors').once('value');
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
    await db.ref('investors' + '/' + id).set({
        name:name,
        legal_status:legal_status,
        address:address,
        email:email,
        phone:phone,
        created_at:created_at,
        description:description,
        investor_type:investor_type,
        investment_focus:investment_focus
    });
    return id;
}

async function modifyInvestor(email, name, legal_status, address, phone, created_at, description, investor_type, investment_focus){
    if ([email, name, legal_status, address, phone, created_at, description, investor_type, investment_focus].some(x => x == null)) {
        console.log("Error here");
        return 1;
    }
    const snapshot = await db.ref('investors').once('value');
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
                await db.ref('investors' + '/' + user.id).set({
                    name:name,
                    legal_status:legal_status,
                    address:address,
                    email:email,
                    phone:phone,
                    created_at:created_at,
                    description:description,
                    investor_type:investor_type,
                    investment_focus:investment_focus
                });
                return 0;
            }
        }
    }
    return 2;
}

module.exports = {createInvestor, modifyInvestor}