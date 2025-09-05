const db = require("../db/firebaseSettings");

async function createStartup(name, legal_status, address, email, phone, created_at, description, website_url, social_media_url, project_status, needs, sector, maturity, founders, password) {
    if ([name, legal_status, address, email, phone, created_at, description, website_url, social_media_url, project_status, needs, sector, maturity, founders, password].some(x => x == null)) {
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
        created_at: created_at,
        description: description,
        website_url: website_url,
        social_media_url: social_media_url,
        project_status: project_status,
        needs: needs,
        sector: sector,
        maturity: maturity,
        founders: founders,
        password: password
    });
    return 0;
}

async function getIdStartupByEmail(email) {
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
                return user.id;
            }
        }
    } else {
        console.log("Not found")
    }
    return '';
}

module.exports = {createStartup, getIdStartupByEmail}