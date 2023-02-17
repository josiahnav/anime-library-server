const express = require('express');
const bodyParser = require('body-parser');

const libraryRouter = require('./routers/library');

const app = express();

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(libraryRouter);

app.listen(3000);