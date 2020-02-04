const request = require('request');

const weatherCall = ( latitude, longtitude, placeName , callBack) => {

    const url = `https://api.darksky.net/forecast/c7017ff0a8bce13e959c394a07ea8259/${latitude},${longtitude}?units=si`;

    // request for new coordinates for the weather 

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callBack('Unable to fetch the weather service data', undefined)

        } else if (body.error) {
            callBack('Unable to fetch the weather JSON data', undefined)
        } else {
            const currWeather = body.currently;
            const dailyData = body.daily.data[0];
            
             const data = {
                 placeName: placeName,
                summary:  `${dailyData.summary} Currently the temperature is ${currWeather.temperature} degrees , the precipitation probability is ${currWeather.precipProbability}%`};
            //     temp : currWeather.temperature,
            //     precipProbability: currWeather.precipProbability
            // };
             
            callBack(undefined, data)

        }

    });
}

module.exports = weatherCall;