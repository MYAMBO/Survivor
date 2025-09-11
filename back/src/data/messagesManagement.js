const db = require("../db/firebaseSettings");
const {GetUserDataById} = require("./usersManagement");

async function CreateConv(creatorId, otherId)
{
    if ([creatorId, otherId].some(x => x == null))
        return false;

    const creatorUser = await GetUserDataById(creatorId);
    const otherUser = await GetUserDataById(otherId);
    if (!creatorUser || !otherUser)
        return false;

    await db.ref('messages').once('value');
    const id = db.ref().push().key;
    await db.ref('messages' + '/' + id).set({
        creatorId:creatorId,
        otherId:otherId
    });
    return true;
}

async function GetAllConv(userId) {
    const snapshot = await db.ref("messages").once("value");
    let convList = [];

    if (snapshot.exists()) {
        const obj = snapshot.val();
        const convGet = Object.entries(obj).map(([id, data]) => ({
            id,
            ...data
        }));

        const filteredConvs = convGet.filter(conv => conv.creatorId === userId);

        for (const conv of filteredConvs) {
            const otherUser = await GetUserDataById(conv.otherId);
            convList.push([conv.id, otherUser?.name || "Unknown"]);
        }
    } else {
        console.log("No conversations found");
    }

    return convList;
}

async function GetMessagesFromConv(convId){
    const snapshot = await db.ref("messages").once("value");
    let convList = [];

    if (snapshot.exists()) {
        const obj = snapshot.val();
        const convGet = Object.entries(obj).map(([id, data]) => ({
            id,
            ...data
        }));

        const messages = convGet.filter(conv => conv.id === convId);
    } else {
        console.log("No conversation found");
    }

    return messages;
}

module.exports = {CreateConv, GetAllConv}