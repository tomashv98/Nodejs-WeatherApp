const request = require("request");


const token = `pk.eyJ1IjoidG9tYXNodjk4IiwiYSI6ImNqdGsxMjQzazE1NmszeWxmbXowbHlibDgifQ.blgW0YLtUxJiG1JtfHgmQQ`;

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}+.json?access_token=${token}&limit=1`;

    request({
        url,
        json: true
    }, function (err, {
        body
    }) {
        if (err) {
            callback("Location not found! Please try again", undefined)
        } else if (body.features.length === 0) {
            callback("Location not found! Please try again", undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                loc: body.features[0].place_name
            })
        }
    });
};


module.exports = geoCode;