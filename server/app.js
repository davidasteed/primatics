const express = require('express');
const bodyParser = require('body-parser');

require('./database-setup.js');

let app = express();

app.use(express.static(__dirname + '/../client/src'));

app.use(bodyParser.json());

app.use('/api/crudobject', require('./routes/crudObject.routes.js'));

app.use(require('./middleware/error-handler-middleware.js'));

app.listen(process.env.PORT || 3000, function runExpressNodeServer() {
  console.log('The server is now up');
  // console.log('the active routes are:', app._router.stack);
});
