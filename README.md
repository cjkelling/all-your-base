# All your Express base are belong to us

[![Build Status](https://travis-ci.com/turingschool-examples/all-your-base.svg?branch=master)](https://travis-ci.com/turingschool-examples/all-your-base)

## Getting started
To use this repo, you’ll need to `fork` the repo as your own. Once you have done that, you’ll need to run the following command to get everything up and running. 

`npm install`

## Endpoints
All-Your-Base has four endpoints:


  GET /api/v1/forecast?location=denver,co
  
  This endpoint returns the weather forecast for the given city. The name of the location is passed to Google's Geocoding API and returns the lattitude and longitude fo the city. The lat and long are then passed into DarkSky's API and returned that cities weather data. This data is run though the all-your-base system and returned in an easy to read and understand manner that shows current weather, the next 8 hours, and the next 7 days.
  
  POST /api/v1/favorites
  
  This endpoint is a POST request to the database. A user will pass in their unique API key along with the city they want to favorite in the body of the request. The system will return a message if the city has been favorited properly.
  
  
  GET /api/v1/favorites
  
  This endpoint is a GET request to the database. A user will pass in their unique API key in the body of the request and the system will return the current weather data for any city location stored in the user's favorites.
  
  
  DELETE /api/v1/favorites
  
  This endpoint is a DELETE request to the database. A user will pass in their unique API key along with the city they want to delete from their favorites. If the city they pass in is not listed in their favorites then an error message will display, otherwise the favorited location will be removed from the database. 
