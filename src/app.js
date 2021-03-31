const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { query } = require('express')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define pathes for express config
const publicDirectoryPath = express.static(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname,'../templates/views')
const pratialsPath = path.join(__dirname, '../templates/partials')

//setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(pratialsPath)

//setup static directory to use
app.use(publicDirectoryPath)

console.log('hello')

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'or abramson',
        subhead: 'All the weather you need'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'or abramson',
        name: 'jhon malkoviych',
        subhead: 'About us'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'help me',
        subhead: 'Ask us anything',
        helpText: 'some helpfull text'
    })
})
app.get('/weather', (req, res) => {

    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'address is needed'
        })
    }
    
    geocode(address, (error, { lat, lon, place } = {}) => {
        forecast(lat, lon, (err, { location, weather, temperature} = {}) => {
            if (err) {
                console.log('error:', err)
                res.send({err})
            } else {
                res.send({ //send - we want the JSON
                    forecast: weather,
                    location: location,
                    address: place,
                    temperature: temperature
                })
            }
        })
    })

})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: '404: cannot find article'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        error: '404: does not exist'
    })})

//app.com
app.listen(port, () => {
    console.log('server is up on port 3000')
})