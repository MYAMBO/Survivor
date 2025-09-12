const {createUser} = require('./usersManagement');
const {modifyInvestor, createInvestor} = require("./investorsManagement");
const {createStartup, getIdStartupByEmail} = require("./startupsManagement")
const {createPartner} = require("./partnersManagement");
const {createEvent} = require("./eventsManagement")
const {createNews} = require("./newsManagement")
const {getUserIdByName} = require("./usersManagement");
const bcrypt = require('bcrypt');
const path = require("path");
const fs = require("fs");

async function fetchWithRetry(url, options, retries = 10, delay = 10) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await fetch(url, options);

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            return res;
        } catch (err) {
            if (attempt < retries) {
                await new Promise(resolve => setTimeout(resolve, delay)); // wait before retry
            } else {
                return null;
            }
        }
    }
}

async function getBase64ImageAndMetadata(url) {
    const response = await fetchWithRetry(url, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    }, 5, 500);

    if (!response) {
        return null;
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    const metadata = {
        "accept-ranges": response.headers.get("accept-ranges"),
        "content-length": response.headers.get("content-length"),
        "content-type": response.headers.get("content-type"),
        "date": response.headers.get("date"),
        "etag": response.headers.get("etag"),
        "last-modified": response.headers.get("last-modified"),
    };

    const base64Image = buffer.toString("base64");

    return {base64Image, metadata};
}

async function callMigration(){
    const response = await fetchWithRetry(process.env.USERS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    }, 10, 200);

    if (response){
        const data = await response.json();

        for (const x of data) {
            const image = await getBase64ImageAndMetadata(`${process.env.USERS_API_ENDPOINT}/${x.id}/image`);

            if (image === null) {
                console.log(`Failed to fetch image for user ID: ${x.id}`);
                continue;
            }

            const {base64Image, metadata} = image;
            x.image = base64Image;
            x.metadata = metadata;
        }
        const hash = await bcrypt.hash("0123456", 10);
        await data.forEach(x => createUser(x.email, x.name, x.role, hash, x.image, x.metadata))
    }

    const responseInvestors = await fetchWithRetry(process.env.INVESTORS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    }, 10, 200);

    if (responseInvestors){
        const dataInvestors = await responseInvestors.json();
        await dataInvestors.forEach(x => createInvestor(x.email, x.name, x.legal_status, x.address, x.phone, x.created_at, x.description, x.investor_type, x.investment_focus))
    }

    const responsePartners = await fetchWithRetry(process.env.PARTNERS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    }, 10, 200);

    if (responsePartners){
        const dataPartners = await responsePartners.json();
        await dataPartners.forEach(x => createPartner(x.email, x.name, x.legal_status, x.address, x.phone, x.created_at, x.description, x.partnership_type))
    }

    const responseEvents = await fetchWithRetry(process.env.EVENTS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    }, 10, 200);

    if (responseEvents){
        const dataEvents = await responseEvents.json();

        for (const x of dataEvents) {
            const image = await getBase64ImageAndMetadata(`${process.env.EVENTS_API_ENDPOINT}/${x.id}/image`);

            if (image === null) {
                console.log(`Failed to fetch image for event ID: ${x.id}`);
                continue;
            }

            const {base64Image, metadata} = image;
            x.image = base64Image;
            x.metadata = metadata;
        }

        await dataEvents.forEach(x => createEvent(x.name, x.dates, x.location, x.description, x.event_type, x.target_audience, x.id, x.image, x.metadata))
    }

    const responseStartups = await fetchWithRetry(process.env.STARTUPS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    }, 10, 200);

    if (responseStartups){
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
            }, 10, 200);

            if (!responseStartupsUnique) {
                continue;
            }

            const dataStartupsUnique = await responseStartupsUnique.json();

            for (const founder of dataStartupsUnique.founders) {
                founder.id = await getUserIdByName(founder.name);
            }
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

    const responseNews = await fetchWithRetry(process.env.NEWS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    }, 10, 200);

    if (responseNews)
    {
        const dataNews = await responseNews.json();
        for (const x of dataNews) {
            const responseNewsId = await fetchWithRetry(process.env.NEWS_API_ENDPOINT + '/' + x.id, {
                method: "GET",
                headers: {
                    "X-Group-Authorization": process.env.API_KEY,
                },
            }, 10, 200);

            if (!responseNewsId) {
                continue
            }

            const dataNewsId = await responseNewsId.json();
            x.description = dataNewsId.description;
            const responseStartupById = await fetchWithRetry(process.env.STARTUPS_API_ENDPOINT + '/' + dataNewsId.id, {
                method: "GET",
                headers: {
                    "X-Group-Authorization": process.env.API_KEY,
                },
            }, 10, 200);

            if (responseStartupById) {
                const dataStartupById = await responseStartupById.json();
                x.startup_id = await getIdStartupByEmail(dataStartupById.email);
            }

            const image = await getBase64ImageAndMetadata(`${process.env.NEWS_API_ENDPOINT}/${x.id}/image`);

            if (image === null) {
                console.log(`Failed to fetch image for news ID: ${x.id}`);
                continue;
            }

            const {base64Image, metadata} = image;
            x.image = base64Image;
            x.metadata = metadata;
        }
        await dataNews.forEach(x => createNews(x.news_date, x.location, x.title, x.category, x.id, x.startup_id, x.description, x.image, x.metadata))
    }
}

module.exports = callMigration;