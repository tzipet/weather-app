const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/eb3f7530d9d1ba420fb653afaec8e6d0/' + latitude +',' + longitude +'?units=si'
    request( { url, json: true}, (error, {body}) => {
      if (error) {
        callback('Unable to connect to Darksky' , undefined)
      } else if (body.error) {
        callback(body.error, undefined)
      } else {
        callback(undefined, body.daily.data[0].summary +" It's currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain")
      }
    })
}

module.exports = forecast
