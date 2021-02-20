import { apiUrl } from "./configuration.js";
const overlayImg = document.querySelector("#overlayImg");
export const movieApi = (() => {
  const fetchApi = (request) => {
    openLoading();
    const requestUrl = `${apiUrl}${request}`;
    return fetch(requestUrl)
      .then((response) => response.json())
      .then((data) => {
        closeLoading();
        return data;
      })
      .catch((e) => {
        closeLoading();
        console.log(e);
        return false;
      });
  };
  const openLoading = () => {
    overlayImg.style.opacity = 0.5;
    overlayImg.style.height = "100%";
    overlayImg.style.width = "100%";
    overlayImg.src = "assets/images/movies-loading.gif";
    document.getElementById("overlay").style.display = "block";
  };

  const closeLoading = () => {
    document.getElementById("overlay").style.display = "none";
    overlayImg.style.height = "70%";
    overlayImg.style.width = "50%";
    overlayImg.style.opacity = 1;
  };
  return {
    fetchApi,
  };
})();
