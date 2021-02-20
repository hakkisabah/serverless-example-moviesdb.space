export const searchMovieByTitle = (movie, searchValue) => {
  return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
};

export const resetBg = (element, child) => {
  element.querySelectorAll(child).forEach((item) => {
    item.style.background = "transparent";
  });
};

export const dataCleaner = (movie, genres) => {
  const year = movie.release_date
    ? movie.release_date.split("-")[0]
    : movie.first_air_date.split("-")[0];

  const cleanedGenres = genres.filter((genre) => {
    const genreNames = movie.genre_ids.map((id) => {
      return genre.id === id ? genre.name : "";
    });
    return genreNames.join("");
  });
  return {
    year,
    cleanedGenres,
  };
};

