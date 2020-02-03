const express = require("express");
const router = express.Router();

const current_weather = require('../../../helper_methods/current_weather');
const google_geocoding = require('../../../helper_methods/google_geocoding');
const darksky_forecast = require('../../../helper_methods/darksky_forecast');

const environment = process.env.NODE_ENV || "development";
const configuration = require("../../../knexfile")[environment];
const database = require("knex")(configuration);

router.post("/", (req, res) => {
  const user_key = req.body.api_key;
  const location = req.body.location;

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
        database('locations').insert({name: location, user_id: user.id})
        .then(favorite => {
          res.status(200).send(`${location} has been added to your favorites.`)
        })
        .catch(error => {res.status(500).json({ error })});
      }
    }
  })
})

router.get("/", (req, res) => {
  const user_key = req.body.api_key;

  database("users").where({api_key: user_key}).first()
  .then(user => {
    if(user_key != user.api_key){
      res.status(401).send("Unauthorized")
    }
    else{
      var array = [];
      var results = database('locations').where({user_id: user.id}).select()
      .then(locations => {
        locations.map(location => {
          google_geocoding(location.name)
          .then(lat_long => {
            if(lat_long != null && lat_long != ''){
              darksky_forecast(lat_long)
              .then(weather_data => {
                array.push(new current_weather(location, weather_data).findForecast())
                if(array.length === locations.length){
                  res.status(200).json(array)
                }
              })
              .catch((error) => console.error({ error }))
            }
            else{
              res.status(401).send("Forecast Information Could Not Be Found.")
            }
          })
        })
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
    }
  })
})

router.delete("/", (req, res) => {
  const user_key = req.body.api_key;
  const location = req.body.location;

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
        database('locations').where({name: location, user_id: user.id}).del()
        .then(
          res.status(200).send(`${location} has been removed from your favorites.`)
        )
      };
    }
  })
  .catch(error => {res.status(500).json( "Location Not Favorited. Please Enter a Valid Location." )});
})

module.exports = router;
