const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
// const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create();
const session = require('express-session');


const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
sequelize.sync({force:false}).then(()=>{

  app.listen(PORT, () =>
    console.log(`Server running on port http://localhost:${PORT}`));
});