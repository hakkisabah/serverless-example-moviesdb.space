import { apiUrl } from "./configuration.js";
var overlayImg = document.querySelector("#overlayImg");
export var movieApi = (() => {
  var fetchApi = request => {
    openLoading();
    var requestUrl = "".concat(apiUrl).concat(request);
    return fetch(requestUrl).then(response => response.json()).then(data => {
      closeLoading();
      return data;
    }).catch(e => {
      closeLoading();
      console.log(e);
      return false;
    });
  };

  var openLoading = () => {
    overlayImg.style.opacity = 0.5;
    overlayImg.style.height = "100%";
    overlayImg.style.width = "100%";
    overlayImg.src = "assets/images/movies-loading.gif";
    document.getElementById("overlay").style.display = "block";
  };

  var closeLoading = () => {
    document.getElementById("overlay").style.display = "none";
    overlayImg.style.height = "70%";
    overlayImg.style.width = "50%";
    overlayImg.style.opacity = 1;
  };

  return {
    fetchApi
  };
})();