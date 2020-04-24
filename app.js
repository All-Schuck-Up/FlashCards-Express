// Init dependenies
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Init Middleware (app.use--indicates middleware functionality)
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Brings in pug for simple easy to handle html handling for rendering
app.set('view engine', 'pug');

// Brings in our app routes useing .Router() from routes folder
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

// Runs server on port 8080 and displays msg to console
app.listen(8080, () => {
    console.log('App running on localhost:8080')
});