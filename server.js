var express = require('express');
var app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
  }));
var controller = require('./controller')
app.use('/', controller);

// var database = require('./database')
var server = app.listen(3001, () => {
    console.log('server is running on port', server.address().port);
   })
