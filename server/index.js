const bodyParser = require('body-parser'); //connects bodyParsing middleware
const apiRoutes = require('./router/api-routes');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use('/api/v1', apiRoutes);

app.listen(port, () => {
    console.log(`Running httpdLogParse on port ${port}`);
})