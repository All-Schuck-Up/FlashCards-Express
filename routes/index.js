const express = require('express');
const router = express.Router();

// Root route TEST WITH => http://localhost:8080
router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) { res.render('index', { name }) } else {
        res.redirect('/hello');
    }
});

// Landing route TEST WITH => http://localhost:8080/hello (user should always land here unless not signed in)
router.get('/hello', (req, res) => {
    res.render('hello');
});
router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

// Log out route (not functioning yet) To do:  code logout button to clear cookie and redirect to landing page
router.post('/goodbye', (req, res) => {
    res.clearCookies('username');
    res.redirect('/hello');
});

module.exports = router;