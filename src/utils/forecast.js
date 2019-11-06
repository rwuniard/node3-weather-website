
const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4bcf9032caa95614c16de0cc571181ea/' + latitude + ',' + longitude;

    request({url: url, json: true}, (error, {body})=> {
        if (error) {
            console.log(error);
            callback(error, undefined);
        }
        else if (body.error) {
            console.log(body.code);
            console.log(body.error);
            callback('error code:' + body.code + ' error:' + body.error, undefined);
        }
        else {
            const result = body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 
            ' degrees out. Max temp: ' + body.daily.data[0].temperatureHigh + ' degrees. Low temp: ' + 
            body.daily.data[0].temperatureLow + ' degrees. There is a ' + body.currently.precipProbability + '% chance of rain.';
            callback(undefined, result);
        }
        
    });
}

module.exports = forecast;
