import express from 'express';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import './config/passport.config';

import flash from 'connect-flash';

import errorMiddleware from './middlewares/error.middleware';
import activationMiddleware from './middlewares/activation.middleware';

import db from './models';
import routes from './routes/index';

// initialize configuration
dotenv.config();

const app = express();
app.use(json());

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());

// create application/json parser
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'some secret',
  saveUninitialized: true,
  resave: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(activationMiddleware);

app.use(routes);

// Handling non matching request from the client
app.use((req, res) => {
  res.redirect('/404');
});

app.use(errorMiddleware);

// db.sequelize.sync();
// for dev to drop existing tables and resync
db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and re-sync db.');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
