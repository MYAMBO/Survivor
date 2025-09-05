const {createUser} = require('./usersManagement');
const {modifyInvestor, createInvestor} = require("./investorsManagement");
const createStartup = require("./startupsManagement")
const {createPartner} = require("./partnersManagement");
const {createEvent} = require("./eventsManagement")
const {createNews} = require("./newsManagement")

async function fetchWithRetry(url, options, retries = 10, delay = 10) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await fetch(url, options);

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            return res; // ✅ success
        } catch (err) {
            if (attempt < retries) {
                await new Promise(resolve => setTimeout(resolve, delay)); // wait before retry
            } else {
                return null; // give up
            }
        }
    }
}


async function callMigration(){
    const response = await fetch(process.env.USERS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    });
    const data = await response.json();
    await data.forEach(x => createUser(x.email, x.name, x.role, "0123456"))
    const responseInvestors = await fetch(process.env.INVESTORS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    });
    const dataInvestors = await responseInvestors.json();
    await dataInvestors.forEach(x => createInvestor(x.email, x.name, x.legal_status, x.address, x.phone, x.created_at, x.description, x.investor_type, x.investment_focus))
    const responsePartners = await fetch(process.env.PARTNERS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    });
    const dataPartners = await responsePartners.json();
    await dataPartners.forEach(x => createPartner(x.email, x.name, x.legal_status, x.address, x.phone, x.created_at, x.description, x.partnership_type))
    const responseEvents = await fetch(process.env.EVENTS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    });
    const dataEvents = await responseEvents.json();
    await dataEvents.forEach(x => createEvent(x.name, x.dates, x.location, x.description, x.event_type, x.target_audience))
    const responseNews = await fetch(process.env.NEWS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    });
    const dataNews = await responseNews.json();
    await dataNews.forEach(x => createNews(x.news_date, x.location, x.title, x.category))
    const responseStartups = await fetch(process.env.STARTUPS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    });
    const dataStartups = await responseStartups.json();
    // console.log(dataStartups);
    // await dataStartups.forEach(x => createStartup(x.name, x.legal_status, x.address, x.email, x.phone, x.created_at, x.description, x.website_url, x.social_media_url, x.project_status, x.needs, x.sector, x.maturity, x.founders, "0123456"))
    for (const x of dataStartups) {
        const url = `${process.env.STARTUPS_API_ENDPOINT}/${x.id}`;
        // console.log("Fetching:", url);

        const responseStartupsUnique = await fetchWithRetry(url, {
            method: "GET",
            headers: {
                "X-Group-Authorization": process.env.API_KEY,
            },
        }, 10, 200); // 10 retries, 200ms delay

        if (!responseStartupsUnique) {
            continue; // skip this startup if still failing
        }

        const dataStartupsUnique = await responseStartupsUnique.json();

        await createStartup(
            x.name,
            x.legal_status,
            x.address,
            x.email,
            x.phone,
            dataStartupsUnique.created_at,
            dataStartupsUnique.description,
            dataStartupsUnique.website_url,
            dataStartupsUnique.social_media_url,
            dataStartupsUnique.project_status,
            dataStartupsUnique.needs,
            x.sector,
            x.maturity,
            dataStartupsUnique.founders,
            "0123456"
        );
    }
}

module.exports = callMigration;