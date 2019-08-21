const request = require('request')
require('dotenv').config()


const geocode = (address, callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + process.env.GEOCODE_API_KEY + '&limit=1'

    request ({ url, json: true}, (error, {body}) => {
      if (error) {
        return callback('Unable to connect to location services', undefined)
      }
      if (body && body.features && body.features.length === 0) {
        return callback('Unable to find location. Try another search', undefined)
      }

      return callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        })

    })

}

module.exports = geocode
