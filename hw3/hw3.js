const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3310;
const app = express();

// GET
app.get('/', (req, res) => {
  res.send('<h1>Homepage</h1>');
});
app.get('/api/query', (req, res) => {
  res.json(req.query);
});
app.get('/api/users/:usid', (req, res, next) => {
  let backJSON = {};
  switch (req.params.usid) {
    case '1':
      backJSON = {
        id: 1,
        name: 'Joe',
        age: 18,
      };
      res.json(backJSON);
      break;

    case '2':
      backJSON = {
        id: 2,
        name: 'John',
        age: 22,
      };
      res.json(backJSON);
      break;

    default:
      next();
  }
});

// POST
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.post('/api/body', (req, res) => {
  res.send(JSON.stringify(req.body));
});

// static files
app.use(express.static('public'));

// not found
app.use((req, res) => {
  res.status(404).send('HTTP status 404: Not found');
});

// listen
app.listen(PORT, () => {
  console.log(`now listening on http://localhost:${PORT}`);
});
