const currently = require('./currently');
const hourly = require('./hourly');
const daily = require('./daily');

class WeatherForecast {
  constructor(location, weather_data){
    this.location = location;
    this.raw_data = weather_data;
  }

  findForecast(){
    return{
      location: this.location,
      currently: currently(this.raw_data.currently),
      hourly: hourly(this.raw_data.hourly),
      daily: daily(this.raw_data.daily)
    }
  }
}

module.exports = WeatherForecast;
