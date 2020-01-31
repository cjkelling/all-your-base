function currently(data) {
  return {
    summary: data.summary,
    icon: data.icon,
    precipIntensity: data.precipIntensity,
    precipProbability: data.precipProbability,
    temperature: data.temperature,
    humidity: data.humidity,
    pressure: data.pressure,
    windSpeed: data.windSpeed,
    windGust: data.windGust,
    windBearing: data.windBearing,
    cloudCover: data.cloudCover,
    apparentTemperature: data.apparentTemperature,
    visability: data.visibility
  }
}

module.exports = currently;
