const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

//import routes
const blog = require('./src/routes/blog/Blog.router.js');
const admin = require('./src/routes/admin/Admin.router.js');

const app = express();

const port = 3000;

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/travel&live')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

//setup sessions and flash
app.use(session({
    secret:'secret',
    saveUninitialized: false,
    resave: true
}));
app.use(flash());

//templating engine config - handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/src/views'));
hbs.registerPartials(__dirname + '/src/views/partials');

//displaying flash messages
app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//static files serve config
app.use(express.static(path.join(__dirname, 'public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse application/json
app.use(bodyParser.json())

//useRoutes
app.use(blog);
app.use(admin);

app.listen(port, () => console.log(`Server started in port ${port}`));
