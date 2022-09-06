import apiConfig from "./apiConfig";

export const category = {
  movie: "movie",
  tv: "tv",
  person: "person",
};
export const movieType = {
  popular: "popular",
  top_rated: "top_rated",
};
export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
};

const tmdbApi = {
  getTrending: (type) => {
    const url =
      apiConfig.baseUrl +
      "trending/" +
      category[type] +
      "/day?api_key=" +
      apiConfig.apiKey;

    return url;
  },
  getVideos: (cate, id) => {
    const url =
      apiConfig.baseUrl +
      category[cate] +
      "/" +
      id +
      "/videos" +
      "?api_key=" +
      apiConfig.apiKey;
    return url;
  },
  getMoviesList: (type) => {
    const url =
      apiConfig.baseUrl +
      "movie/" +
      movieType[type] +
      "?api_key=" +
      apiConfig.apiKey +
      "&language=en-US";

    return url;
  },

  getTvList: (type) => {
    const url =
      apiConfig.baseUrl +
      "tv/" +
      tvType[type] +
      "?api_key=" +
      apiConfig.apiKey +
      "&language=en-US";
    return url;
  },
  getPerson: () => {
    const url =
      apiConfig.baseUrl +
      "person/popular?api_key=" +
      apiConfig.apiKey +
      "&language=en-US";
    return url;
  },

  getSingleResult: (category, id) => {
    const url =
      apiConfig.baseUrl +
      category +
      "/" +
      id +
      "?api_key=" +
      apiConfig.apiKey +
      "&language=en-US";

    return url;
  },

  search: (query) => {
    const url =
      apiConfig.baseUrl +
      "search/" +
      "multi" +
      "?api_key=" +
      apiConfig.apiKey +
      "&language=en-US" +
      "&query=" +
      query +
      "&include_adult=true";
    return url;
  },
  getCollection: (id) => {
    const url =
      apiConfig.baseUrl +
      "collection/" +
      id +
      "?api_key=" +
      apiConfig.apiKey +
      "&language=en-US";

    return url;
  },
  getMovieTvbyGenre: (category, discoverType, genreId) => {
    const url =
      apiConfig.baseUrl +
      "discover/" +
      category +
      "?api_key=" +
      apiConfig.apiKey +
      "&language=en-US&sort_by=" +
      discoverType +
      "&with_genres=" +
      genreId +
      "&with_watch_monetization_types=flatrate&include_adult=true";

    return url;
  },
  getGenre: (category) => {
    const url =
      apiConfig.baseUrl +
      "genre/" +
      category +
      "/list?api_key=" +
      apiConfig?.apiKey;

    return url;
  },

  discover: (type, discoverType) => {
    const url =
      apiConfig.baseUrl +
      "discover/" +
      category[type] +
      "?api_key=" +
      apiConfig.apiKey +
      "&language=en-US&sort_by=" +
      discoverType +
      `&with_watch_monetization_types=flatrate`;

    return url;
  },

  getSingleSeason: (tvId, seasonNumber) => {
    const url =
      apiConfig.baseUrl +
      "tv/" +
      tvId +
      "/season/" +
      seasonNumber +
      "?api_key=" +
      apiConfig.apiKey +
      "&language=en-US";

    return url;
  },
};

export default tmdbApi;
