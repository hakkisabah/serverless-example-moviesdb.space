const axios = require("axios");

exports.movieApi = async (params,splitWhat) => {
  try {
    const response = await axios
      .get(
        `${process.env.THEMOVIEAPIRURL}${params}${splitWhat}api_key=${process.env.THEMOVIEDBAPIKEY}`
      )
      .then((response) => {
        return response.data;
      });
    return response;
  } catch (e) {
    console.log("MOVIE ERROR ", e.message);
    return false
  }
};
exports.imageApi = async (imageName)=>{
  try{
    const response = axios
  .get(
        `https://image.tmdb.org/t/p/w500/${imageName}`
    )
        .then(() => {
          return `https://image.tmdb.org/t/p/w500/${imageName}`;
        });
    return response;
  }catch (e) {
    console.log("MOVIE IMAGE ERROR ", e.message);
    return false
  }
}
