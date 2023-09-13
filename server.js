require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const database = require('./config/database');
const petRoutes = require('./routes/petRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./models/userModel');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

app.use(session({
    secret: 'adopt a pet bff',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


app.use('/', petRoutes);
app.use('/', userRoutes);

database();

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});