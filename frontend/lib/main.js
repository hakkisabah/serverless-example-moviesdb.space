function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { movieApi } from "./requester.js";
import { tableElements, filterElementProps } from "./configuration.js";
import ElementProcess from "./ElementProcess.js";
import { ListenerProcess } from "./ListenerProcess.js";
import { dataCleaner } from "./helpers.js";

class MoviesApp extends ElementProcess {
  constructor(tableElements) {
    super(tableElements);
    this.currentData = [];
    this.currentFilter = [];
    this.trending = {};
    this.trendingResults = [];
    this.genres = [];
    this.filmGenre = [];
    this.Listener = new ListenerProcess(this);
  }

  fetcher(requestUrl) {
    return _asyncToGenerator(function* () {
      return movieApi.fetchApi(requestUrl);
    })();
  }

  getGenres() {
    var _this = this;

    return _asyncToGenerator(function* () {
      var data = _extends({}, yield _this.fetcher("list/genres/all"));

      _this.genres = data.data.genres;
    })();
  }

  getTrending() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.trending = (yield _this2.fetcher("list/trending/all")).data;
      _this2.trendingResults = _this2.trending.results;
    })();
  }

  fillMovie() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      yield _this3.getGenres();
      yield _this3.getTrending();
      var years = [];
      var genres = [];

      var moviesArr = _this3.trendingResults.map(movie => {
        var {
          year,
          cleanedGenres
        } = dataCleaner(movie, _this3.genres);
        movie.year = year;
        years.push(year);
        movie.genres = cleanedGenres;
        genres.push(movie.genre_ids);

        _this3.currentData.push(movie);

        return _this3.createMovieLine(movie);
      }).join("");

      _this3.orderAndCountFilmsForFilter({
        years,
        genres: _this3.genres
      });

      _this3.$tbodyEl.innerHTML = moviesArr;

      _this3.Listener.clearFilterListenerHandler();

      _this3.Listener.movieLineListenerHandler(_this3.currentData);

      _this3.Listener.overLayListenerHandler();
    })();
  }

  orderAndCountFilmsForFilter(filteringData) {
    var counteddYears = [];
    this.trendingResults.forEach(film => {
      var tempYear = film.release_date ? film.release_date.split("-")[0] : film.first_air_date.split("-")[0];
      counteddYears[tempYear] = (counteddYears[tempYear] || 0) + 1;
    });
    var countedGenresWithName = [];
    this.trendingResults.forEach(film => {
      film.genre_ids.forEach(genreId => {
        this.genres.forEach(genre => {
          var genreName = genre.id === genreId ? genre.name : "";

          if (genreName.length > 0) {
            countedGenresWithName[genreName] = (countedGenresWithName[genreName] || 0) + 1;
          }
        });
      });
    });
    var counted = {
      years: counteddYears,
      genres: countedGenresWithName
    };
    filteringData.years = [...new Set(filteringData.years.sort((a, b) => {
      return a - b;
    }))];
    filteringData.genres = Object.keys(countedGenresWithName).filter(el => {
      return el;
    });
    this.renderFilters(filteringData, counted);
  }

  renderFilters(orderedData, countedData) {
    var createdYearFilter = this.filterElementCreator(filterElementProps.year, orderedData.years, countedData.years);
    this.Listener.filterListenerHandler(createdYearFilter, filterElementProps.year.name);
    var createdGenreFilter = this.filterElementCreator(filterElementProps.genre, orderedData.genres, countedData.genres);
    this.Listener.filterListenerHandler(createdGenreFilter, filterElementProps.genre.name);
  }

  init() {
    this.fillMovie();
    this.Listener.handleSearch();
  }

}

var myMoviesApp = new MoviesApp(tableElements);
myMoviesApp.init();