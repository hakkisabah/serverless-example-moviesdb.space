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
  async fetcher(requestUrl) {
    return movieApi.fetchApi(requestUrl);
  }
  async getGenres() {
    const { ...data } = await this.fetcher("list/genres/all");
    this.genres = data.data.genres;
  }
  async getTrending() {
    this.trending = (await this.fetcher("list/trending/all")).data;
    this.trendingResults = this.trending.results;
  }

  async fillMovie() {
    await this.getGenres();
    await this.getTrending();
    let years = [];
    let genres = [];
    const moviesArr = this.trendingResults
      .map((movie) => {
        const { year, cleanedGenres } = dataCleaner(movie, this.genres);
        movie.year = year;
        years.push(year);
        movie.genres = cleanedGenres;
        genres.push(movie.genre_ids);
        this.currentData.push(movie);
        return this.createMovieLine(movie);
      })
      .join("");
    this.orderAndCountFilmsForFilter({
      years,
      genres: this.genres,
    });
    this.$tbodyEl.innerHTML = moviesArr;
    this.Listener.clearFilterListenerHandler();
    this.Listener.movieLineListenerHandler(this.currentData)
    this.Listener.overLayListenerHandler()
  }

  orderAndCountFilmsForFilter(filteringData) {
    let counteddYears = [];
    this.trendingResults.forEach((film) => {
      const tempYear = film.release_date
        ? film.release_date.split("-")[0]
        : film.first_air_date.split("-")[0];
      counteddYears[tempYear] = (counteddYears[tempYear] || 0) + 1;
    });
    let countedGenresWithName = [];
    this.trendingResults.forEach((film) => {
      film.genre_ids.forEach((genreId) => {
        this.genres.forEach((genre) => {
          const genreName = genre.id === genreId ? genre.name : "";
          if (genreName.length > 0) {
            countedGenresWithName[genreName] =
              (countedGenresWithName[genreName] || 0) + 1;
          }
        });
      });
    });
    const counted = {
      years: counteddYears,
      genres: countedGenresWithName,
    };

    filteringData.years = [
      ...new Set(
        filteringData.years.sort((a, b) => {
          return a - b;
        })
      ),
    ];

    filteringData.genres = Object.keys(countedGenresWithName).filter((el) => {
      return el;
    });

    this.renderFilters(filteringData, counted);
  }

  renderFilters(orderedData, countedData) {
    const createdYearFilter = this.filterElementCreator(
      filterElementProps.year,
      orderedData.years,
      countedData.years
    );

    this.Listener.filterListenerHandler(
      createdYearFilter,
      filterElementProps.year.name
    );

    const createdGenreFilter = this.filterElementCreator(
      filterElementProps.genre,
      orderedData.genres,
      countedData.genres
    );

    this.Listener.filterListenerHandler(
      createdGenreFilter,
      filterElementProps.genre.name
    );
  }

  init() {
    this.fillMovie();
    this.Listener.handleSearch();
  }
}
let myMoviesApp = new MoviesApp(tableElements);

myMoviesApp.init();
