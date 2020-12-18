const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars  = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');

//connect to database
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded(
  {extended: true,}
));
app.use(express.json());

//HTTP Logger
app.use(morgan('combined'));

//Template Engine
app.engine('hbs', handlebars(
    {extname: '.hbs'}
));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//Route init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});