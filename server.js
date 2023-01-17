var path = require('path');
var express = require('express');
var app = express();
var morgan  = require('morgan');
const http = require('http');

app.use('/', express.static(path.join(__dirname, 'views')));
app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'));

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8081


app.set('port', server_port);

const server = http.createServer(app);



server.listen(server_port);

