const mongoose = require('mongoose');
require('dotenv').config({ path: '../../config/.env' });
const URI = process.env.MONGODB_URI
const localUri = process.env.LOCAL_URI;
const testUri = process.env.TEST_URI


mongoose.connect(testUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.log('URI' + localUri);
        console.log('Connection Failed', err);
    } else {
        console.log('Connected');
    }
})


