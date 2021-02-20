class ElementProcess {
  constructor(tableElements) {
    this.tableElements(tableElements);
  }

  tableElements(DOMElements) {
    var [root, childEl, searchInput, searchForm] = DOMElements;
    this[root.variableName] = document[root.methodName](root.params);
    this[childEl.variableName] = this[childEl.parent][childEl.methodName](childEl.params);
    this[searchInput.variableName] = document[searchInput.methodName](searchInput.params);
    this[searchForm.variableName] = document[searchForm.methodName](searchForm.params);
  }

  filterElementCreator(filterElementProps, movieFilterValue, countedArr) {
    var $inclusiveElement = document.querySelector(filterElementProps.parentId);

    for (var i = 0; i < [...movieFilterValue].length; i++) {
      $inclusiveElement.innerHTML += "<div class=\"form-check\"><input class=\"form-check-input\" type=\"".concat(filterElementProps.type, "\" name=\"").concat(filterElementProps.name, "\" id=\"").concat(filterElementProps.name, "-").concat(i, "\" value=\"").concat(movieFilterValue[i], "\"><label for=\"year-").concat(i, "\" class=\"form-check-label\">").concat(movieFilterValue[i], " (").concat(countedArr[movieFilterValue[i]], ")</label></div>");
    }

    return this.filterButtonCreator($inclusiveElement, filterElementProps.button.id);
  }

  filterButtonCreator(parentElement, buttonElementId) {
    var button = document.createElement("button");
    button.id = buttonElementId;
    button.type = "submit";
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.innerText = "Filter";
    parentElement.append(button);
    return button;
  }

  createMovieLine(movie) {
    var {
      title,
      name,
      genres,
      year,
      id,
      poster_path,
      backdrop_path
    } = movie;
    return "<tr data-id=\"".concat(id, "\"><td><img src=\"https://image.tmdb.org/t/p/w500/").concat(poster_path || backdrop_path, "\" onerror=\"this.src='assets/images/no-image-found-360x250.png'\"></td><td class=\"column-width text-break\">").concat(title || name, "</td><td class=\"column-width text-break\">").concat(genres.map(genre => genre.name).join("-"), "</td><td>").concat(year, "</td></tr>");
  }

}

export default ElementProcess;