const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express()
const data = require('./data.js');
const accounts = data.accounts;
const users = data.users;
const writeJSON = data.writeJSON;
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0]
    });
});

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts: accounts
    });
});

app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
})