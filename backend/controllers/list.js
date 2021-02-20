const {movieApi} = require("../utils/axios");

const trending = (() => {
  const splitWhat = '?';
  const all = (dayOrWeek) => {
    return `trending/all/${dayOrWeek === "day" ? "day" : "week"}`;
  };
  const movie = (dayOrWeek) => {
    return `trending/movie/${dayOrWeek === "day" ? "day" : "week"}`;
  };
  const tv = (dayOrWeek) => {
    return `trending/tv/${dayOrWeek === "day" ? "day" : "week"}`;
  };
  const person = (dayOrWeek) => {
    return `trending/person/${dayOrWeek === "day" ? "day" : "week"}`;
  };
  return {
    all,
    movie,
    tv,
    person,
    splitWhat,
  };
})();

// req.params.type params must be =>
// all
// movie
// person
// tv
//
// req.params.time params possibility => day or week
exports.getTrending = async (req, res, next) => {
  if (typeof trending[req.params.type] === "function") {
    const trendMovies = await movieApi(
      trending[req.params.type](req.params.time),
      trending.splitWhat
    );
    if (trendMovies !==false){
      return res.sendData(trendMovies);
    }else{
      return res.sendError("Has an a error",500)
    }
  }
  return res.UnprocessableEntity("Are you sure ?");
};

//
//
//
const genre = (() => {
  const splitWhat = '&';
  const all = () => {
    return `genre/movie/list?`;
  };
  const get = (id, page = 1) => {
    return `discover/movie?sort_by=release_date.desc&with_genres=${id}&include_adult=false&page=${page}`;
  };
  const byDate = () => {
    // 'sort_by=release_date.asc&release_date.gte=1950-01-01&release_date.lte=2020-01-01&with_genres=37&include_adult=false'
  };
  return {
    all,
    get,
    splitWhat,
  };
})();

exports.getGenres = async (req, res, next) => {
  const isAll = req.params.category === "all" ? req.params.category : "get";
  if (typeof genre[isAll] === "function") {
    const genres = await movieApi(
      genre[isAll](
        isAll === "get" ? req.params.category : "",
        req.params.page ? req.params.page : 1
      ),
      genre.splitWhat
    );
    if (genres !==false){
      return res.sendData(genres);
    }else{
      return res.sendError("Has an a error",500)
    }
  }
  return res.UnprocessableEntity("Are you sure ?");
};
