const request = require('request')


const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ec524d3da00397b276a40dacd199d9ee&query=${lat},${lon}&units=f`
    request({ url: url, json: true }, (errorResponse, response) => {
        const {error, current, location} = response.body
        if (error) {
            callback('cannot establish connection', undefined)
        } else if (error) {
            callback('cant find location', undefined)
        } else {
            callback(undefined, { location: location.region, weather: current.weather_descriptions[0]})
        }
    })
}

module.exports = forecast