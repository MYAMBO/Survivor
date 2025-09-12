var admin = require("firebase-admin");

var serviceAccount = require("../../dbKeys.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://survivordemodemo-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();
module.exports = db;