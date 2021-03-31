
const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicG9wbzIwNyIsImEiOiJja210YWg1NHowN2lzMzNxZTlsZHBoMnpkIn0.Q1KR_mE--2P-8WcPwowqUg&limit=1`
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('unable to connect', undefined)
        } else if (response.body.features.length === 0) {
            callback('missing information', undefined)
        } else {
            callback(undefined, {
                lat: response.body.features[0].center[1], 
                lon: response.body.features[0].center[0],
                place: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode