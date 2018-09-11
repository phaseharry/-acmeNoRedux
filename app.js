const express = require('express');
const path = require('path');
const { syncAndSeed } = require('./db/user');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/api', routes);

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

const init = () => {
  return syncAndSeed();
};

init();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port: ${port}`));
