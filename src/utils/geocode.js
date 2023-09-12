const request = require('request')

const geoCode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGR2amgiLCJhIjoiY2xtY2ZnNXNkMTJzczNkanJvYWE0b2ZiNiJ9.CzREQV5k-59s9XwTGBCDBQ&limit=1'
    request({url, json:true}, (error, {body}={}) => {
        if (error) {callback('unable to connect location services!')}
        else if (body.features.length=== 0){ callback('unable to find location!', undefined);}
       else {
        callback( undefined, {
          lat: body.features[0].center[1],
          long: body.features[0].center[0],
          location: body.features[0].place_name
        })
    }
    })
}

module.exports = geoCode