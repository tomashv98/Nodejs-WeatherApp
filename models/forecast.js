const request = require("request");

const key = `752fddd4fb565871720eaf66c1de707a`;

const forecast = ({
    lat,
    long
}, callback) => {
    const url = `https://api.darksky.net/forecast/${key}/${lat},${long}`;
    request({
        url,
        json: true
    }, function (err, {
        body
    }) {
        if (err) {
            callback(err, undefined)
        } else if (body.error) {
            callback(err, undefined)
        } else {
            callback(undefined, {
                sum: body.currently.summary,
                temp: body.currently.temperature,
            });
        }
    });
};

module.exports = forecast;