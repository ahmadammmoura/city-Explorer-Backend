const express = require('express')
var cors = require('cors')
const app = express()
const data = require('./assets/data.json')
require('dotenv').config()
const port = process.env.PORT
app.use(cors())

app.get('/weather', function (req, res) {
  res.send(data);
})
 
app.listen(port)