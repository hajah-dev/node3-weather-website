
const request = require('request');
// BEFORE CALLBACK
/*const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los Angeles.json?limit=1&access_token=pk.eyJ1IjoiaGFqYWgiLCJhIjoiY2s5cnVnbXM4MHljYjNtcDc3MjZrcGlhZSJ9.ikXpYoFeN9gaowDtKBq51w';
request({ url: url2, json: true }, (error, response) => {
    if(error) {                                                     // Low level error
        console.log('Unable to connect to weather service, please try again');
    } else if(response.body.message || response.body.features.length === 0){
        console.log('Unable to find location');
    }
    else{
        const resp = response.body;
        
        console.log(`Coordinates of Los Angeles: \n Longitude: ${resp.features[0].center[0]} \n
                    latitude: ${resp.features[0].center[1]}`);
        
    }
})*/

//AFTER CALLBACK AND AFTER DESTRUCTURING
const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ adress +'.json?limit=1&access_token=pk.eyJ1IjoiaGFqYWgiLCJhIjoiY2s5cnVnbXM4MHljYjNtcDc3MjZrcGlhZSJ9.ikXpYoFeN9gaowDtKBq51w';
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
};

module.exports = geocode;