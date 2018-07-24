const express = require('express');
const port = 3000;
const app = express();
const birds = require('./backend/routes');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors({origin: '*'}));

app.use('/', birds);

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
  .then(
    app.listen(port, () => console.log('Server is running on '+ port +' port'))
  )
  .catch(
    (err) => console.log(err)
  );
