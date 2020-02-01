function daily(data) {
  return{
    summary: data.summary,
    icon: data.icon,
    data: data.data.slice(0,7).map( hour => {
      return {
        time: hour.time,
        summary: hour.summary,
        icon: hour.icon,
        sunriseTime: hour.sunriseTime,
        sunsetTime: hour.sunsetTime,
        precipIntensity: hour.precipIntensity,
        precipIntensityMax: hour.precipIntensityMax,
        precipIntensityMaxTime: hour.precipIntensityMaxTime,
        precipProbability: hour.precipProbability,
        temperatureHigh: hour.temperatureHigh,
        temperatureLow: hour.temperatureLow,
        humidity: hour.humidity,
        pressue: hour.pressue,
        windSpeed: hour.windSpeed,
        windGust: hour.windGust,
        cloudCover: hour.cloudCover,
        visibility: hour.visibility,
        temperatureMin: hour.temperatureMin,
        temperatureMax: hour.temperatureMax
      }
    })
  }
}


module.exports = daily;
