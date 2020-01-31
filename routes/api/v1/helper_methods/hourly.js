function hourly(data) {
  return{
    summary: data.summary,
    icon: data.icon,
    data: data.data.slice(0,8).map( hour => {
      return {
        time: hour.time,
        summary: hour.summary,
        icon: hour.icon,
        precipIntensity: hour.precipIntensity,
        precipProbability: hour.precipProbability,
        temperature: hour.temperature,
        humidity: hour.humidity,
        pressue: hour.pressue,
        windSpeed: hour.windSpeed,
        windGust: hour.windGust,
        windBearing: hour.windBearing,
        cloudCover: hour.cloudCover,
        visibility: hour.visibility
      }
    })
  }
}


module.exports = hourly;
