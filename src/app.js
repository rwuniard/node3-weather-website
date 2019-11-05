const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// This is to show where the directory where the app.js is located.
console.log(__dirname);
console.log(__filename);

console.log(path.join(__dirname, '../public'));

const app = express();

// Define path for Express config.
const public_dir_path = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// This will server the static root directory.
app.use(express.static(public_dir_path));

// Route the handlebars to the index.hbs (This will be inside the views folder. The views is the default folder for handlebars.)
app.get('', (req, resp) => {
    resp.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    });
});

// The about page route with handlebars
app.get('/about', (req, resp) => {
    resp.render('about', {
        title: 'About',
        name: 'Andrew'
    });
});

// The help page route with handlebars
app.get('/help', (req, resp) => {
    resp.render('help', {
        title: 'Help',
        name: 'Andrew Mead'
    });
});

// This is to respond to http://localhost:3000
// app.get('', (req, resp) => {
//     resp.send('<h1>Weather</h1>');
// });

// This is to respond to http://localhost:3000/help
// app.get('/help', (req, resp) => {
//     resp.send([{
//         name: 'Andrew',
//         age: 27
//     }, {
//         name: 'Jim',
//         age:17
//     }]);
// });


// http://localhost:3000/about
// app.get('/about', (req, resp) => {
//     resp.send('<h1>About page</h1>');
// })

// http://localhost:3000/weather?address=Atlanta
app.get('/weather', (req, resp) => {
    if (!req.query.address) {
        return resp.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if (error) {
            return resp.send(error);
        }
        forecast(latitude, longitude, (error, forecastResult) => {
            if (error) {
                return resp.send(error);
            }
            resp.send({
                forecast: forecastResult,
                location: place_name,
                address: req.query.address
            });
        })
    })
    
    
});

app.get('/products', (req, resp) => {
    if (!req.query.search) {
        return resp.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search);
    resp.send({
        products: []
    })
})

app.get('/help/*', (req, resp) => {
    resp.render('error', {
        title: '404',
        name: 'Andrew',
        error_message: 'Help article is not found'
    });
});

// This is the 404 and this needs to be last.
// The app will go from the top to find a match, 
// and if there is no match, this will be caught here.
app.get('*', (req, resp) => {
    resp.render('error', {
        title: '404',
        name: 'Andrew',
        error_message: '404 Page not found.'
    });
});

app.listen(3000, () => {
    console.log('The server is up on port 3000');
});


