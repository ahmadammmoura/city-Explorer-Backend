require('dotenv').config()
const
  express = require("express"),
  router = express.Router(),
  superagent = require('superagent');
  routeBase = '/weather',
  keyWeather = process.env.WEATHER_BIT_KEY;


router.get(routeBase, getWeather);

const memory ={ }


function getWeather(req,res){

  const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily`;

  const queryParams ={
    key : keyWeather,
    lat : req.query.lat,
    lon : req.query.lon
  }

  


  try {
    superagent.get(weatherBitUrl)
      .query(queryParams)
      .then(city => city.body.data)
      .then(data => {
        if(memory[`city${queryParams.lat}`] !== undefined){
          console.log('from memory')
          res.send(memory[`city${queryParams.lat}`] );
        }else{
        const arrayOfData = data.map(city => new Weather(city));
        memory[`city${queryParams.lat}`] = arrayOfData
        console.log('with req')
        res.send(arrayOfData);
        }
      });
    
  } catch (error) {
    res.send(error)
  }
}


class Weather {
  constructor(data) {
    this.description = data.weather.description,
      this.date = data.valid_date
  }
}



module.exports = router;