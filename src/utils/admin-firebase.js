const admin = require('firebase-admin');


let serviceAccount = require("../../mkbike-node.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mkbike-135bf-default-rtdb.firebaseio.com"
});

module.exports.admin = admin