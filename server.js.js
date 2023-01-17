var path = require('path');
var express = require('express');
var app = express();

var htmlPath = path.join(__dirname, 'public');

app.use(express.static(htmlPath));
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var server = app.listen(server_port,server_ip_address, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});