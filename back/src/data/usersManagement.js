const db = require("../db/firebaseSettings");
const {createInvestor} = require("./investorsManagement");
const createFounder = require("./foundersManagement");

async function createUser(email, name, role, password, image = null, metadata = null) {
    if ([email, name, role, password].some(x => x == null)) {
        console.log("Error here");
        return 1;
    }
    const snapshot = await db.ref('users').once('value');
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
    let founderId = "";
    let investorId = "";
    if (role === "founder")
        founderId = await createFounder(email);
    if (role === "investor")
        investorId = await createInvestor(email);

    await db.ref('users' + '/' + id).set({
        email: email,
        name: name,
        role: role,
        founder_id: founderId,
        investor_id: investorId,
        password: password,
        image: `data:image/png;base64,${image}`,
        metadata: metadata
    });
    return 0;
}

async function deleteUser(id) {
    await db.ref('users' + '/' + id).remove();
}

async function GetAllUsersData() {
    const snapshot = await db.ref('users').once('value');
    if (snapshot.exists()) {
        const obj = snapshot.val()
        const users = Object.entries(obj).map(([id, data]) => {
            const { password, ...rest } = data;
            return {
                id,
                ...data
            };
        });
        const myStr = JSON.stringify(users, null, 0)
        const myObj = JSON.parse(myStr)
        return myObj;
    } else {
        console.log("Not found")
        return null;
    }
}

async function GetUserDataById(id) {
    const snapshot = await db.ref('users').once('value');
    if (snapshot.exists()) {
        const obj = snapshot.val()
        const users = Object.entries(obj).map(([id, data]) => ({
            id,
            ...data
        }));
        const myStr = JSON.stringify(users, null, 0)
        const myObj = JSON.parse(myStr)
        for (const user of myObj){
            if (user.id === id){
                return user;
            }
        }
    } else {
        console.log("Not found")
    }
}

module.exports = {createUser, deleteUser, GetUserDataById, GetAllUsersData}