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

async function getStartupsListByFounderId(id) {
    const snapshot = await db.ref('startups').once('value');
    let startups = [];
    if (snapshot.exists()) {
        const obj = snapshot.val()
        const allStartups = Object.entries(obj).map(([id, data]) => ({
            id,
            ...data
        }));
        const myStr = JSON.stringify(allStartups, null, 0)
        const myObj = JSON.parse(myStr)
        for (const startup of allStartups) {
            if (startup.founders) {
                for (const founder of startup.founders) {
                    if (founder.id === id) {
                        startups.push(startup);
                    }
                }
            }
        }
    } else {
        console.log("Not found")
    }
    return startups;
}

module.exports = {createStartup, getStartupList, GetStartupInformationsById, getIdStartupByEmail, getStartupsListByFounderId}