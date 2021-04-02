const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI
const localUri = process.env.LOCAL_URI;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log('Connection Failed', err);
    } else {
        console.log('Connected');
    }
})