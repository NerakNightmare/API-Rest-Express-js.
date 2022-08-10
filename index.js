const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');


const { logErrors, errorHandler, boomErrorHandler} = require ('./middleware/error.handler')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); //acept any dom

const whitelist = ['http//localhost:8080','http://myapp.com'];

const options ={
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true);
    }else{
      callback(new Error('acces denied'));
    }
  }
}

app.get('/', (req, res) => {
  res.send('Hello, my server in Express');
});


app.get('/new-dir', (req, res) => {
  res.send('Hello, im a new directory');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);





app.listen(port,() => {
  console.log('My port ' + port);
});


