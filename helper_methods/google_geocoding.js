const fetch = require("node-fetch");
const dotenv = require("dotenv");
const google_key = dotenv.config()["parsed"].GOOGLE_API_KEY;

function google_geocoding(location) {
  const google_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&&key=${google_key}`;
  return fetch(google_url)
  .then(res => res.json())
  .then(json => json.results[0].geometry.location)
}

module.exports = google_geocoding;
