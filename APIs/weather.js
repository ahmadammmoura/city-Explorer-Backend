require('dotenv').config()
const
  express = require("express"),
  router = express.Router(),
  superagent = require('superagent');
  routeBase = '/weather',
  key = process.env.WEATHER_BIT_KEY;


router.get(routeBase, function (req, res) {
  try {

    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${key}&lat=${req.query.lat}&lon=${req.query.lon}`

    superagent.get(weatherBitUrl)
      .then(city => city.body.data)
      .then(data => {
        const arrayOfData = data.map(city => new Weather(city));
        res.send(arrayOfData);
      })
  } catch (error) {
    res.send(error)
  }
});


class Weather {
  constructor(data) {
    this.description = data.weather.description,
      this.date = data.valid_date
  }
}



module.exports = router;