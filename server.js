const express = require('express');

let app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', port);

require('./routes')(app);

// api:hello
/*app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});*/

/*app.get('*', (req, res) => res.status(200).send({
  message: 'Test GET api',
}));
*/
app.listen(port, () => console.log(`Listening on port ${port}`));

//module.exports = app;