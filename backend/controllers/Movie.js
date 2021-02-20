const { movieApi, imageApi } = require("../utils/axios");
module.exports = class Movie {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    if (typeof this[req.params.request] === "function" && req.params.arg) {
      this[req.params.request](req.params.arg);
    }
  }

  async get(id) {
    const movie = await movieApi(`movie/${id}`, "?");
    if (movie !== false) {
      return this.res.sendData(movie);
    } else {
      return this.res.sendError("Has an a error", 500);
    }
  }
  async getimage(imageName) {
    // https://image.tmdb.org/t/p/w500/mNASlEOFX2c9upxaSbgeKFvIr1L.jpg
    const imageUrl = await imageApi(imageName);
    if (imageUrl !== false) {
      return { imageUrl };
    } else {
      return false;
    }
  }
};
