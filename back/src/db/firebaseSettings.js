var admin = require("firebase-admin");

var serviceAccount = require("../../dbKeys.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://survivor-76fbd-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();
module.exports = db;