const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI
const localUri = process.env.LOCAL_URI;
mongoose.connect(localUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.log('Connection Failed', err);
    } else {
        console.log('Connected');
    }
})