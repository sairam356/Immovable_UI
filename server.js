const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const server = http.createServer(app)

// See: http://expressjs.com/en/4x/api.html#app.settings.table
const PRODUCTION = app.get('env') === 'production';

// Administrative routes are not timed or logged, but for non-admin routes, pino
// overhead is included in timing.


app.use('/', express.static(path.join(__dirname, 'views')));

app.get('/ready', (req, res) => res.status(200).json({status:"ok"}));
app.get('/live', (req, res) => res.status(200).json({status:"ok"}));



const PORT = process.env.PORT || 9090;
server.listen(PORT, () => {
  console.log(`App started on PORT ${PORT}`);
});