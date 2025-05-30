require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');  
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf');
const app = express();
const routes = require('./routes');
const {
    middlewareGlobal,
    checkCsrfError,
    csrfMiddleware
} = require('./src/middlewares/middleware');

mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
    console.log('MongoDB conectado');
    app.emit('ready');
}).catch(erro => console.log('Erro MongoDB', erro));

app.use(helmet({contentSecurityPolicy: false}));
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.resolve(__dirname,'public')));


app.use(expressLayouts);
app.set('layout', 'layout');  

const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_CONNECTION}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 604800000,
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    }
});

app.use(sessionOptions);
app.use(flash());

app.use(csrf());
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(express.static('public'));
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(middlewareGlobal);
app.use(routes);

app.on('ready', () => {
    app.listen(3000, () => {
        console.log('Servidor rodando http://localhost:3000');
    });
});
