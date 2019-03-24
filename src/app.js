const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = require('request');

const app = express();

const geoCode = require("../models/geocode");
const forecast = require("../models/forecast");

const pubDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(pubDirPath));


app.get("/", (req, res) => {
    res.redirect("/home");
});
app.get("/home", (req, res) => {
    res.render("index");

});


app.get("/weather", (req, response) => {
    if (!req.query.address) {
        return response.send({
            error: 'You must enter a location name'
        });
    }
    // Find forecast per input, geoData are {lat, long} location returned - currying
    geoCode(req.query.address, (error, geoData = {}) => {
        if (error) {
            return response.send({
                error
            });
        }
        // {lat,long} from geoData are passed, forecastData returns {sum, temp}
        forecast(geoData, (error, forecastData = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            console.log(`Today forecast for ${geoData.loc}: It will be ${forecastData.sum} with average temperature of ${forecastData.temp}`);
            response.send({
                Forecast: `Today in ${geoData.loc}, it will be ${forecastData.sum} with the highest temperature at ${forecastData.temp}`,

            });
        });


    });

});



app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/help", (req, res) => {
    res.render("help");
});


// 404
app.get("/help/*", (req, res) => {
    res.render("Help Page Not Found");
});

app.get("/*", (req, res) => {
    res.render("404");
});


app.listen(8080, () => {
    console.log("Server started")
});