const request = require('request');
// BEFORE CALLBACK
/***request({ url: url, json: true }, (error, response) => {
    // to test if everything works well, we can console.log the response: console.log(response).
    // What we got is the String Json data that we want to pass and access.  Now, let's focus on the body property which contains our data 
    // represented as a JSON string.
    //**const data = JSON.parse(response.body); //(1)
    // let's console.log again to get what we got in that data
    //**console.log(data.current);// (2)
    // Goal:    -learn how a request can automatically parse the Json for us
    //          -printing a forecast using the response data
    //          -exploring some options for the API allowing us to change language from english to french or changing the units...
    // LEARN HOW A REQUEST CAN AUTOMATICALLY PARSE TH JSON:
    // We can do this by customizing the options object. There is a list of all available options over the 'module- request' documentation.
    // Let's add : json: true in the request object as mentionned in the documentation. Doing that, we need to change our function because we don't need to 
    // parse the response body any more.(In our request, we asking to get from the url a response as a json). We need to remove (1) and (2) and replace them:
    // and what we get here is an javscript object, so we have access to each property using the dot notation. 
    // **console.log(response.body.current); // (3) after adding json: true
    // Now that request is parsing the Json for us, we don't have to manually add that code every single time we're trying to make an http request from node.
    // PRINT FORECAST USING THE RESPONSE DATA
    if(error) {                                                     // Low level error
        console.log('Unable to connect to weather service, please try again');
    }
    else if(response.body.error){                                   // Invalid input error
        console.log('Unable to find location');
    }
    else{
        console.log(`It is currently ${response.body.current.temperature} far out. It feels like ${response.body.current.feelslike} far`);
    }
   
})*/

// AFTER CALLBACK
/*
const weatherCode = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=396e9e393d5851090e3cfec0939fcf23&query='+lat+','+long+'&units=m';
    request({ url: url, json: true }, (error, response) => {
    
        if(error) {                                                     // Low level error
            callback('Unable to connect to weather service, please try again', undefined);
        }
        else if(response.body.errorStatus){                                   // Invalid input error
            callback('Unable to find location', undefined);
        }
        else{
            callback(undefined, `It is currently ${response.body.current.temperature} far out. It feels like ${response.body.current.feelslike} far`);
        }
    })
};
*/





// HANDLING ERROR
// When things goes wrong, the error argument contains a value and response doesn't. So we have to go ahead and add a conditional logic
// making sure we are checking that there is no error before we try to interact with the response.
// To be able to get a lisible resume of the error that we may have : (in using the code above) we can : console.log it as: console.log(error)
// Let's change the request we did with the weatherstack API and add an if statement to consider the error. 
// In summary, we have these two arguments : error and response, only one is ever going to be populated, the other is going to be undefined. 
// So if we have a value for error, there's not gonna be a value for response. If we have for response we're not going to have a value for error

// AFTER USING DESTRUCTURING AND SHORTHAND SYNTAX:

const weatherCode = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=396e9e393d5851090e3cfec0939fcf23&query='+lat+','+long+'&units=m';
    request({ url, json: true }, (error, { body }) => { // here we know that response is an object, and the only property we are ever using for it is body
      
        if(error) {                                                     // Low level error
            callback('Unable to connect to weather service, please try again', undefined);
        }
        else if(body.errorStatus){                                   // Invalid input error
            callback('Unable to find location', undefined);
        }
        else{
            callback(undefined, `It is currently ${body.current.temperature} *c out. It feels like ${body.current.feelslike} *c
                     The humidity ${body.current.humidity} is higher than normaly, and the climat is ${body.current.weather_descriptions[0]}`);
        }
    })
};
module.exports = weatherCode;