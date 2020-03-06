const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// middlewares
app.use(cors());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use(require('./routes/bars'));
app.use(require('./routes/users'));


app.listen(4000);
console.log('Server on port 4000');