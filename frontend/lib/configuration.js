export var filterElementProps = {
  year: {
    parentId: "#byyear",
    type: "radio",
    name: "year",
    button: {
      id: "yearSubmitter"
    }
  },
  genre: {
    parentId: "#bygenre",
    type: "checkbox",
    name: "genres",
    button: {
      id: "genreSubmitter"
    }
  }
};
export var tableElements = [{
  variableName: "$tableEl",
  methodName: "getElementById",
  params: "movies-table"
}, {
  parent: "$tableEl",
  variableName: "$tbodyEl",
  methodName: "querySelector",
  params: "tbody"
}, {
  variableName: "$searchInput",
  methodName: "getElementById",
  params: "searchInput"
}, {
  variableName: "$searchForm",
  methodName: "getElementById",
  params: "searchForm"
}];
export var apiUrl = 'https://7glv7h90zh.execute-api.eu-central-1.amazonaws.com/api/';