const express = require("express");
const router = express.Router();

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
        res.status(404).send(" Location Not Found. Please Enter a Valid Location.")
      }
      else{
        database('locations').insert({name: location, user_id: user.id})
        .then(favorite => {
          res.status(200).send(`${location} has been added to your favorites`)
        })
        .catch(error => {res.status(500).json({ error })});
      }
    }
  })
})

module.exports = router;
