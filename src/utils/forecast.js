const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8c7424b8f90515dae1e8f27146a034dc&query=' + lat + ',' + long
    request({url, json: true}, (error,{body}) => {
        if (error) {callback('unable to connect to the weather service!')}
         else if (body.error) {callback('unable to find location', undefined)} else
         {data = 'The temperature is ' + body.current.temperature + ' ,it feels like ' + body.current.feelslike
        callback(undefined, data)}
        }
    )

}

module.exports= forecast;