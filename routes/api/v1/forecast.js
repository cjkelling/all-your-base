const express = require("express");
const fetch = require("node-fetch");
const weather_forecast = require('../../../helper_methods/current_weather');
const router = express.Router();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

const dotenv = require("dotenv");
const google_key = dotenv.config()["parsed"].GOOGLE_API_KEY;
const dark_sky_key = dotenv.config()["parsed"].DARK_SKY_API_KEY;

router.get("/", (req, res) => {
  const user_key = req.body.api_key;
  const location = req.query.location;
  const google_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&&key=${google_key}`;

  database("users").where({api_key: user_key})
  .then(user => {
    if(user === null || user === ''){
      return(console.log("401, No User Found"));
    }
    else{
      if(location === null || location === ''){
        return(console.log("401, Enter a Valid Locaiton"));
      }
      else{
        fetch(google_url)
        .then(res => res.json())
        .then(json => json.results[0].geometry.location)
        .then(lat_long => {
          if(lat_long != null && lat_long != ''){
            const dark_sky_url = `https://api.darksky.net/forecast/${dark_sky_key}/${lat_long.lat},${lat_long.lng}`
            fetch(dark_sky_url)
            .then(res => res.json())
            .then(json => json)
            .then(weather_data => {
              res.status(200).json((new weather_forecast(location, weather_data)).findForecast())
            })
            .catch((error) => console.error({ error }))
          }
          else{
            return(console.log("401, No Weather Data."));
          }
        })
      }
    }
  })
})

module.exports = router;
