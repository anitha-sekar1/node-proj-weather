const request = require('request');

const geoCode = (addr, callBack) => {

    // Getting the coordinates from the API
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addr)}.json?access_token=pk.eyJ1IjoiYW5pdGhhc2VrYXIiLCJhIjoiY2s2MHl3N3ZlMDBhczN3cnh1cXVobmRoOSJ9.VdRda9Y70NY75L3pv3Gk0w&limit=1`;

    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callBack('Unable to fetch the location', undefined)
           
        } else if (body.features.length === 0) {
            callBack( 'No data found for the location', undefined)
        } else {
            const {features} = body;
            // const coordinate = {
            //     latitude: features[0].center[1],
            //     longtitude: features[0].center[0],
            //     placeName: features[0].place_name
            // }
            callBack( undefined,{
                    latitude : features[0].center[1],
                    longtitude : features[0].center[0],
                    placeName : features[0].place_name
                 });
        

        }
    });
}

module.exports = geoCode;