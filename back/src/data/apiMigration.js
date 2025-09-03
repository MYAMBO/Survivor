const addUser = require('./usersManagement');
const {createInvestor, modifyInvestor} = require("./investorsManagement");

async function callMigration(){

    const response = await fetch(process.env.USERS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    });
    const data = await response.json();
    await data.forEach(x => addUser(x.email, x.name, x.role, "0123456"))
    const responseInvestors = await fetch(process.env.INVESTORS_API_ENDPOINT, {
        method: "GET",
        headers: {
            "X-Group-Authorization": process.env.API_KEY,
        },
    });
    const dataInvestors = await responseInvestors.json();
    await dataInvestors.forEach(x => modifyInvestor(x.email, x.name, x.legal_status, x.address, x.phone, x.created_at, x.description, x.investor_type, x.investment_focus))
}

module.exports = callMigration;