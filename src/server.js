const express = require('express');
const app = express();
const fileupload = require('express-fileupload')
const path = require('path')

require('dotenv').config();

const userRouter = require('./routers/user');
const pointsRouter = require('./routers/points');
const priceRouter = require('./routers/price');
const eventRouter = require('./routers/events');
const newsRouter = require('./routers/news');
const notificationRouter = require('./routers/notification');
const adminRouter = require('./routers/admin');

const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');

const passport = require('passport');
let cors = require('cors');

const port = process.env.PORT;


app.use(express.json());
app.use(cors())
app.use(fileupload())
app.use(express.static(path.join(__dirname, 'uploads')))

//Security
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp())

//Limiting http requests
const limiter = rateLimit({
  windowMs: 10 * 60 * 100,
  max: 100
})
app.use(limiter)

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
require('./auth/auth')(passport);



app.use(userRouter);
app.use(pointsRouter);
app.use(priceRouter);
app.use(eventRouter);
app.use(newsRouter);
app.use(notificationRouter);
app.use(adminRouter);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

module.exports = app.listen(port, () => {
  console.log('Server is running on ' + port);
})

