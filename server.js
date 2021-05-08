const express = require('express'),
      cors = require('cors'),
      app = express(),
      weather = require('./APIs/weather'),
      movies = require('./APIs/movies'),
      port = process.env.PORT

app.use(cors())
app.use(weather)
app.use(movies)

app.listen(port)