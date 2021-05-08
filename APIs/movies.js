require('dotenv').config()
const
  express = require("express"),
  router = express.Router(),
  superagent = require('superagent');
  routeBase = '/movies'
  moviesKey = process.env.MOVIES_API_KEY

  router.get(routeBase, function (req, res) {

    try{
      const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${moviesKey}&query=${req.query.cityName}&page=1&include_adult=false&page=1`
      const weatherData = superagent.get(moviesURL)
      .then(movie => movie.body.results)
      .then(data => {
        const arrayOfmovies = data.map(movie => new Movies(movie));
        console.log(arrayOfmovies)
        res.send(arrayOfmovies);
      })
    }catch (error) {
      res.send(error)
    }
  
  });

  class Movies {
    constructor(data){
      this.title = data.title,
      this.overview = data.overview,
      this.average_votes = data.vote_average,
      this.total_votes = data.vote_count,
      this.image_url = data.poster_path,
      this.popularity = data.popularity,
      this.released_on = data.release_date
    }
  }

  module.exports = router;