export var searchMovieByTitle = (movie, searchValue) => {
  return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
};
export var resetBg = (element, child) => {
  element.querySelectorAll(child).forEach(item => {
    item.style.background = "transparent";
  });
};
export var dataCleaner = (movie, genres) => {
  var year = movie.release_date ? movie.release_date.split("-")[0] : movie.first_air_date.split("-")[0];
  var cleanedGenres = genres.filter(genre => {
    var genreNames = movie.genre_ids.map(id => {
      return genre.id === id ? genre.name : "";
    });
    return genreNames.join("");
  });
  return {
    year,
    cleanedGenres
  };
};