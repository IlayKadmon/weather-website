const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//setup handelbars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'ilay kadmon'
    })
})


app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'ilay kadmon',
        textHelp: 'help'
    })
})


app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'ilay kadmon'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({error: 'You must provide an address term'});
    }
    geocode(req.query.address, (error,{lat,long,location} = {}) => {
        if (error) { return res.send({error})}
        forecast(lat, long, (error, forecastData) => {
            if (error) { return res.send({error});
            }
            res.send({location, forecastData, address: req.query.address});
            
          })  
    })
    
})


app.get('/help/*', (req,res) => {
    res.render('404', {error: 'help article not found', name: 'ilay kadmon', title: '404'})
})

app.get('*', (req,res) => {
    res.render('404', {error: 'Page not found', name: 'ilay kadmon', title: '404'})
})


app.listen(port, () => {
console.log('Server is up on port ' + port);
})
