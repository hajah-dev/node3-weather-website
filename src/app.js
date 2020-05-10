const path = require('path');
const express = require('express');   
const hbs = require('hbs'); 
const geocode = require('./utils/geocode');
const weatherCode = require('./utils/forecasts');

const app = express();            

console.log('This is tuto about git repository');
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/weather', (req, res) => { 
    const adress = req.query.adress; 
    if(!adress){
        return res.send({
           error: 'An adress must be provided' 
        });
    }
    geocode(adress, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
        else{
            weatherCode(latitude, longitude, (error, forcastData) => {
                if(error)
                    return res.send({ error });
                else {
                    res.send({
                        title: 'Geolocation & Forecast',
                        location: location,
                        latitude:latitude,
                        longitude: longitude, 
                        forecast: forcastData
                    });
                }
            }); 
        }  
    })
});


/*
app.get('/weather', (req, res) => { 
    const adress = req.query.adress; 
    if(!adress){
        return res.send({
           error: 'An adress must be provided' 
        });
    }                                      // for app.com/weather
    res.send({
        title: 'Weather Home',
        forecast: "It's running here, almost 10 degré. Need more sunny day",
        location: req.query.adress
    });
});*/












// app.get('/products', (req, res) => {
//     if(!req.query.search){
//        return res.send({
//             error: 'You must provide a search term'
//         });
//     }
//     console.log(req.query);
//     res.send({
//         products: []
//     });
// });

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Hajah Andri'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the weather app',
        name: 'Hajah Andri'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Hajah Andri'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hajah Andri',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hajah Andri',
        errorMessage: 'Page not found'
    });
});

app.listen(2000, () => {
    console.log('Server start to run on port 2000');
})
