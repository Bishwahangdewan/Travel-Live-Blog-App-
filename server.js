const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

const port = 3000;

//templating engine config - handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/src/views'));
hbs.registerPartials(__dirname + '/src/views/partials', (err) => {
  console.log(err);
})

//static files serve config
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
  res.render('home');
})

app.listen(port, () => console.log(`Server started in port ${port}`));
