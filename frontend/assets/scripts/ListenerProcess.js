import { resetBg, searchMovieByTitle } from "./helpers.js";

export class ListenerProcess {
  constructor(props) {
    this.movieSelf = props;
  }

  genreFinderLogic(movie, handlerName, selected) {
    const selectedLogic = movie[handlerName]
      .map((finded) => {
        return finded.name === selected ? finded.id : "";
      })
      .join("");
    return selectedLogic;
  }

  filterListenerHandler(element, handlerName) {
    element.addEventListener("click", () => {
      resetBg(this.movieSelf.$tbodyEl, "tr");
      const selectedValues = this.handleFilter(handlerName);
      selectedValues.forEach((selected) => {
        this.movieSelf.currentData
          .filter((movie) => {
            if (handlerName === "genres") {
              return this.genreFinderLogic(movie, handlerName, selected);
            } else {
              return movie[handlerName] === selected;
            }
          })
          .forEach((filtered) => this.movieSelf.currentFilter.push(filtered));
      });
      this.showFilter();
    });
  }
  showFilter() {
    this.movieSelf.$tbodyEl.innerHTML = "";
    this.movieSelf.currentFilter = new Set(this.movieSelf.currentFilter);
    this.movieSelf.currentFilter.forEach((el) => {
      this.movieSelf.$tbodyEl.innerHTML += this.movieSelf.createMovieLine(el);
    });
    this.movieLineListenerHandler(this.movieSelf.currentFilter)
    this.movieSelf.currentFilter = [];
  }

  handleFilter(handlerName) {
    const selectedFilter = Array.prototype.slice.call(
      document.querySelectorAll(`input[name='${handlerName}']:checked`)
    );
    const selected = selectedFilter.map((selected) => selected.value);
    return selected;
  }

  handleSearch() {
    this.movieSelf.$searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      resetBg(this.movieSelf.$tbodyEl, "tr");
      const searchValue = this.movieSelf.$searchInput.value;
      if (searchValue) {
        this.movieSelf.currentData
          .filter((movie) => {
            movie.title = movie.title ? movie.title : movie.name;
            return searchMovieByTitle(movie, searchValue);
          })
          .forEach((filtered) => this.movieSelf.currentFilter.push(filtered));
        this.movieSelf.$searchInput.value = "";
        this.showFilter();
      }
    });
  }
  overLayListenerHandler() {
    const overlay = document.querySelector("#overlay");
    overlay.addEventListener("click", function () {
      overlay.style.display = "none";
    });
  }
  movieLineListenerHandler(currentData) {
    const overlayImg = document.querySelector("#overlayImg");
    const imageBase = "https://image.tmdb.org/t/p/w500/"
    currentData.forEach((movie) => {
      document
        .querySelector(`tr[data-id="${movie.id}"]`)
        .addEventListener("click", function (event) {
          overlayImg.src = imageBase + (movie.poster_path || movie.backdrop_path)
          document.getElementById("overlay").style.display = "block";
        });
    });
  }
  clearFilterListenerHandler() {
    document
      .getElementById("clearFilter")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.clearFilter();
      });
  }
  clearFilter() {
    Array.prototype.slice
      .call(
        document.querySelectorAll(`input[class='form-check-input']:checked`)
      )
      .forEach((selected) => (selected.checked = false));
    this.movieSelf.$tbodyEl.innerHTML = "";
    this.movieSelf.currentData.forEach((movie) => {
      this.movieSelf.$tbodyEl.innerHTML += this.movieSelf.createMovieLine(
        movie
      );
    });
    this.movieLineListenerHandler(this.movieSelf.currentData)
  }
}
