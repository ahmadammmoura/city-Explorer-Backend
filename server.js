const express = require('express')
var cors = require('cors')
const superagent = require('superagent');
const app = express()
const wather = require('./assets/data.json')
require('dotenv').config()
const port = process.env.PORT
const key = process.env.WEATHER_BIT_KEY
app.use(cors())

app.get('/weather', function (req, res) {
  try{
  const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${key}&lat=${req.query.lat}&lon=${req.query.lon}`
  const weatherData = superagent.get(weatherBitUrl)
  .then(city => city.body.data )
  .then(data => {
    const arrayOfData = data.map(city => new Weather(city));
    res.send(arrayOfData);
  })
}catch (error) {
  res.send(error)
}
});

class Weather {
  constructor(data){
    this.description = data.weather.description,
    this.date = data.valid_date
  }
}

 
app.listen(port)