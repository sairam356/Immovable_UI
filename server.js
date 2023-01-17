var path = require('path');
var express = require('express');
var app = express();
var morgan  = require('morgan');

app.use(express.static('views'));
app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'));

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


app.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already

 
    res.render('index.html');
  
});

var server = app.listen(server_port,server_ip_address, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});