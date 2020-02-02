const currently = require('./currently');

class WeatherForecast {
  constructor(location, weather_data){
    this.location = location;
    this.raw_data = weather_data;
  }

  findForecast(){
    return{
      location: this.location,
      current_weather: currently(this.raw_data.currently),
    }
  }
}

module.exports = WeatherForecast;
