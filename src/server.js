const express = require('express');
const routes = require('./routes');
var bodyParser = require('body-parser');
require('./database')



const app  = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(routes);

app.listen(3003);