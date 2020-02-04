
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

const port = process.env.PORT || 3000;

const geoCode = require('./utils/geoCode');
const weatherCall = require('./utils/forecast');

// define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirPath));
// home page

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Data',
        name: 'Anitha Sekar'
    });
})
// app.get('', (req, res)=>{
//   res.send('<h1> Weather Data</h1>');
// })
// help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anitha Sekar',
        msg: 'This is help message'
    })
})

// app.get('/help', (req, res) => {
//     res.send('Help Page')
// })
// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anitha Sekar'
    })
})
// app.get('/about', (req, res)=>{
//     res.send('<h1>About the Page</h1>')
// })
// Weather Page
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Must provide the location'
        })
    }
    geoCode(req.query.address, (error, {latitude, longtitude, placeName} = { }) => {
        if (error) {
            return res.send({
                error: error
            })
        }
  
        weatherCall(latitude, longtitude, placeName, (error, wData) => {

            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send([
                {
                    
                     placeName: wData.placeName,
                     summary: wData.summary,
                    // temparature: wData.temp,
                    // precipProbability: wData.precipProbability,
                    address: req.query.address

                }

            ])
        });
    });

})

// Product Page
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Must provide the search term'
        })

    }
    console.log(req.query.search);
    res.send({
        products: []
    })

})

// rendering handlebars for error pages
app.get('/help/*', (req, res) => {
    res.render('e404', {
        title: '404',
        name: 'Anitha Sekar',
        errMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('e404', {
        title: '404',
        name: 'Anitha Sekar',
        errMsg: 'Page not found'
    })
})
// Listening the server
app.listen(port, () => {
    console.log(`Server is up in port ${port}`)
})