const request = require('request')
require('dotenv').config()


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + process.env.FORECAST_API_KEY + '/' + latitude +',' + longitude +'?units=si'
    request( { url, json: true}, (error, {body}) => {
      if (error) {
        callback('Unable to connect to Darksky' , undefined)
      } else if (body.error) {
        callback(body.error, undefined)
      } else {

        callback(undefined, body.daily.data[0].summary +" It's currently " + body.currently.temperature + " °C out with a high of " + body.daily.data[0].temperatureHigh + " °C and a low of " + body.daily.data[0].temperatureLow + " °C. There is a " + body.currently.precipProbability * 100 + "% chance of rain and the humidity will be at " + body.daily.data[0].humidity * 100 + "% for today.")

      }
    })
}

module.exports = forecast
