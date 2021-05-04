const express = require('express')
var cors = require('cors')
const app = express()
const wather = require('./assets/data.json')
require('dotenv').config()
const port = process.env.PORT
app.use(cors())

app.get('/weather', function (req, res) {
  const arrayOfData = wather.data.map(data => new Weather(data));
  console.log(arrayOfData)
  res.send(arrayOfData);
});

class Weather {
  constructor(data){
    this.description = data.weather.description,
    this.date = data.valid_date
  }
}

 
app.listen(port)