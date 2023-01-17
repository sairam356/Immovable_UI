var path = require('path');
var express = require('express');
var app = express();

var htmlPath = path.join(__dirname, 'public');

app.use(express.static(htmlPath));
 var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8989;
 var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var server = app.listen(port, function () {

    var host =  ip;
    var port = port
    console.log('listening on http://'+host+':'+port+'/');
});

