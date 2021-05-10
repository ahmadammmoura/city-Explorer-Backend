require('dotenv').config()
const
  express = require("express"),
  router = express.Router(),
  superagent = require('superagent');
  routeBase = '/movies'
  moviesKey = process.env.MOVIES_API_KEY

  router.get(routeBase,getMovies);
  const memory ={ }

function getMovies(req,res){

  const moviesURL = `https://api.themoviedb.org/3/search/movie`

  const queryParams = {
    api_key : moviesKey,
    query : req.query.cityName,
    page : 1,
    include_adult : false
  }

  try{

    if(memory[queryParams.query]!== undefined){
      console.log("using cash")
      res.send(memory[queryParams.query]);
    }else{
      superagent.get(moviesURL)
      .query(queryParams)
      .then(movie => movie.body.results)
      .then(data => {
        console.log('from req ')
        const arrayOfmovies = data.map(movie => new Movies(movie));
        memory[queryParams.query] = arrayOfmovies
        res.status(200).send(arrayOfmovies);
      })
    }
  }catch (error) {
    res.status(500).send(error)
  }


}

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