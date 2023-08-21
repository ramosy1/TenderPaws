require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const database = require('./config/database');
const petRoutes = require('./server/routes/petRoutes');
const expressLayouts = require('express-ejs-layouts');

database();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

app.use('/', petRoutes);


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});