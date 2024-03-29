const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const handlebars  = require('express-handlebars');

const SortMiddleware = require('./app/middlewares/sortMiddleware');


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

//method-override
app.use(methodOverride('_method'));

//Custom middleware
app.use(SortMiddleware);

//HTTP Logger
app.use(morgan('combined'));

//Template Engine
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: require('./helpers/handlebars'),
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//Route init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});