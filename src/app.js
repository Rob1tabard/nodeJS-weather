const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Path config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials')

// Handlebars config
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// 
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Robin Tabard'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Robin Tabard'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page where you can be helped if you need to',
        name: 'Robin Tabard'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: `It's 50 degrees`,
    //     location: 'philadelphia',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Article not found',
        message: 'Help article not found...',
        name: 'Robin Tabard'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMessage: 'Page not found',
        name: 'Robin Tabard'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})