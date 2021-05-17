const express = require('express');
const app = express();


const userRouter = require('./routers/user');
const pointsRouter = require('./routers/points');
const priceRouter = require('./routers/price');
const eventRouter = require('./routers/events');
const newsRouter = require('./routers/news');
const notificationRouter = require('./routers/notification');
const fcmTokenRouter = require('./routers/fcmTokens');
const adminRouter = require('./routers/admin');

const passport = require('passport');
const path = require('path');
let cors = require('cors')

const port = process.env.PORT;


app.use(express.json());
app.use(cors())
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
app.use(fcmTokenRouter);
app.use(adminRouter);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  })

app.listen(port, () => {
    console.log('Server is running on ' + port);
})

