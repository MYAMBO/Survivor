const db = require("../db/firebaseSettings");

async function createInvestor(email) {
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
        name:"",
        legal_status:"",
        address:"",
        email:email,
        phone:"",
        created_at:"",
        description:"",
        investor_type:"",
        investment_focus:""
    });
    return id;
}

module.exports = createInvestor