var path = require('path');
var express = require('express');
var app = express();

var htmlPath = path.join(__dirname, 'public');

app.use(express.static(htmlPath));
 var port = process.env.OPENSHIFT_NODEJS_PORT;
 var ip   = process.env.OPENSHIFT_NODEJS_IP ;
var server = app.listen(port, function () {

    var host =  ip;
    var port = port
    console.log('listening on http://'+host+':'+port+'/');
});

