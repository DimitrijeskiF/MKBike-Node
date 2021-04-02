const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const pointsRouter = require('./routers/points');
const passport = require('passport');


const port = process.env.PORT;


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");

    next()
})

app.use(passport.initialize());
app.use(passport.session());
require('./auth/auth')(passport);

app.use(userRouter);
app.use(pointsRouter);


app.listen(port, () => {
    console.log('Server is running on ' + port);
})

