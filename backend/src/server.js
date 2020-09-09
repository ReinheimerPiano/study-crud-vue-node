const express = require('express');
const routes = require('./routes');

const app = express();

app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log(`Server started on http://localhost:3000`);
});

module.exports = app;