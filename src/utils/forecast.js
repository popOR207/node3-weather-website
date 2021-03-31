const request = require('request')


const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ec524d3da00397b276a40dacd199d9ee&query=${lat},${lon}&units=f`
    request({ url: url, json: true }, (errorResponse, response) => {
        const {error, current, location} = response.body
        if (errorResponse) {
            callback('cannot establish connection', undefined)
        } else if (error) {
            callback('please enter a valid location', undefined)
        } else {
            callback(undefined, { location: location.region, weather: current.weather_descriptions[0], temperature: current.temperature})
        }
    })
}

module.exports = forecast