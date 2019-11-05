const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicnd1bmlhcmQiLCJhIjoiY2syMm1zZGp3MDY2bTNobWp1czhiMnFidSJ9.v7SueDI2CrLI_KUDusoi-g';
    request({url: url, json:true}, (error, {body}) => {
        if (error) {
            const errorMsg = {
                error: 'Unable to connect to location services'
            }
            callback(errorMsg, undefined);
        } 
        else if (body.features.length ==0) {
            const errorMsg = {
                error: 'Unable to find location. Try another search'
            }
            callback(errorMsg, undefined);

        }
        else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const place_name = body.features[0].place_name;
            const result = {
                longitude: longitude,
                latitude: latitude,
                place_name: place_name
            }
            callback(undefined, result);
        }
    });
}

module.exports = geocode;
