const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const pointsRouter = require('./routers/points');
const priceRouter = require('./routers/price');
const eventRouter = require('./routers/events');
const newsRouter = require('./routers/news');
const passport = require('passport');
const path = require('path');


const port = process.env.PORT;


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");

    next()
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
require('./auth/auth')(passport);

app.use(userRouter);
app.use(pointsRouter);
app.use(priceRouter);
app.use(eventRouter);
app.use(newsRouter);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  })

app.listen(port, () => {
    console.log('Server is running on ' + port);
})

