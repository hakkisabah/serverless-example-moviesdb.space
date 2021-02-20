class ElementProcess {
  constructor(tableElements) {
    this.tableElements(tableElements);
  }

  tableElements(DOMElements) {
    const [root, childEl, searchInput, searchForm] = DOMElements;
    this[root.variableName] = document[root.methodName](root.params);
    this[childEl.variableName] = this[childEl.parent][childEl.methodName](
      childEl.params
    );
    this[searchInput.variableName] = document[searchInput.methodName](
      searchInput.params
    );
    this[searchForm.variableName] = document[searchForm.methodName](
      searchForm.params
    );
  }

  filterElementCreator(filterElementProps, movieFilterValue, countedArr) {
    const $inclusiveElement = document.querySelector(
      filterElementProps.parentId
    );
    for (let i = 0; i < [...movieFilterValue].length; i++) {
      $inclusiveElement.innerHTML += `<div class="form-check"><input class="form-check-input" type="${
        filterElementProps.type
      }" name="${filterElementProps.name}" id="${
        filterElementProps.name
      }-${i}" value="${
        movieFilterValue[i]
      }"><label for="year-${i}" class="form-check-label">${
        movieFilterValue[i]
      } (${countedArr[movieFilterValue[i]]})</label></div>`;
    }
    return this.filterButtonCreator(
      $inclusiveElement,
      filterElementProps.button.id
    );
  }

  filterButtonCreator(parentElement, buttonElementId) {
    const button = document.createElement("button");
    button.id = buttonElementId;
    button.type = "submit";
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.innerText = "Filter";
    parentElement.append(button);
    return button;
  }

  createMovieLine(movie) {
    let { title, name, genres, year, id, poster_path, backdrop_path } = movie;
    return `<tr data-id="${id}"><td><img src="https://image.tmdb.org/t/p/w500/${
      poster_path || backdrop_path
    }" onerror="this.src='assets/images/no-image-found-360x250.png'"></td><td class="column-width text-break">${
      title || name
    }</td><td class="column-width text-break">${genres
      .map((genre) => genre.name)
      .join("-")}</td><td>${year}</td></tr>`;
  }
}
export default ElementProcess;
