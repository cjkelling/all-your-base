const fetch = require("node-fetch");
const dotenv = require("dotenv");
const dark_sky_key = dotenv.config()["parsed"].DARK_SKY_API_KEY;

function darksky_forecast(lat_long) {
  const dark_sky_url = `https://api.darksky.net/forecast/${dark_sky_key}/${lat_long.lat},${lat_long.lng}`
  return fetch(dark_sky_url)
  .then(res => res.json())
  .then(json => json)
}

module.exports = darksky_forecast;
