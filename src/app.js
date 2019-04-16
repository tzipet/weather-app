const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir to serve
app.use(express.static(publicDir))


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Tzipet'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Tzipet'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    body: 'You can type your region, city or zip code in order to get a real time weather forecast along with information about the temperature and humidity',
    name: 'Tzipet'
  })
})

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/weather', (req, res) => {
if (!req.query.address) {
  return res.send({
    error: 'You must provide an address'
  })
}

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
      if (error) {
        return res.send({error})
      }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
      return res.send({
          error: 'You must provide a valid address'
        })
      } else {
        res.send({
          location: location,
          forecast: forecastData,
          address: req.query.address
        })
      }
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Tzipet',
    error: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Tzipet',
    error: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
