const express = require('express');
const routerApi = require('./routes');


const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, my server in Express');
});


app.get('/new-dir', (req, res) => {
  res.send('Hello, im a new directory');
});

routerApi(app);






app.listen(port,() => {
  console.log('My port ' + port);
});


