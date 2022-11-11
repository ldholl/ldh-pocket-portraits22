const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const hbs = exphbs.create({});
const path = require(`path`);
const routes = require(`./controllers`);

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const session = require(`express-session`);
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);

const sess = {
    secret: "MIVv*?v[b$lH75D",
    cookie: {
        // Sessions automatically expires in 15 minutes
        expires: 15 * 60 * 1000
    },
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore ({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, `public`)));

app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
});