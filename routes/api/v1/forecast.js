const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

const weather_forecast = require('../../../helper_methods/current_weather');
const google_geocoding = require('../../../helper_methods/google_geocoding');
const darksky_forecast = require('../../../helper_methods/darksky_forecast');

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

router.get("/", (req, res) => {
  const user_key = req.body.api_key;
  const location = req.query.location;

  database("users").where({api_key: user_key}).first()
  .then(user => {
    if(user_key != user.api_key){
      res.status(401).send("Unauthorized")
    }
    else{
      if(location === null || location === ''){
        res.status(404).send("Please Enter a Valid Location.")
      }
      else{
        google_geocoding(location)
        .then(lat_long => {
          if(lat_long != null && lat_long != ''){
            darksky_forecast(lat_long)
            .then(weather_data => {
              res.status(200).json((new weather_forecast(location, weather_data)).findForecast())
            })
            .catch((error) => console.error({ error }))
          }
          else{
            res.status(401).send("Forecast Information Could Not Be Found.")
          }
        })
      }
    }
  })
})

module.exports = router;
