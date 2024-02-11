const APIKEY = "04dfb569116a7e9773eb28cd28146693";
const APIURL = "https://api.themoviedb.org/3/";

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGRmYjU2OTExNmE3ZTk3NzNlYjI4Y2QyODE0NjY5MyIsInN1YiI6IjY1YmMzOWZmZTE4Yjk3MDE2Mjk5ODk3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ReWqixLImhy96bOOmhmfxLUS3N3juhWC_NXIbi_pGOU",
  },
};

/* Home Screen */
export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${APIURL}trending/movie/day?api_key=${APIKEY}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await fetch(
      `${APIURL}movie/upcoming?api_key=${APIKEY}&language=en-US&page=1`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await fetch(
      `${APIURL}movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

/* movie screen */

export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(
      `${APIURL}movie/${id}?api_key=${APIKEY}&language=en-US`,
      options // Pass options including Authorization header
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null; // Return null or handle error appropriately
  }
};

export const fetchCast = async (id) => {
  try {
    const response = await fetch(
      `${APIURL}movie/${id}/credits?api_key=${APIKEY}`,
      options // Pass options including Authorization header
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null; // Return null or handle error appropriately
  }
};

export const fetchSimilarMovies = async (id) => {
  try {
    const response = await fetch(
      `${APIURL}movie/${id}/similar?api_key=${APIKEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

/* Actor Screen */

export const fetchActorDetails = async (id) => {
  try {
    const response = await fetch(
      `${APIURL}person/${id}?api_key=${APIKEY}&language=en-US`,
      options // Pass options including Authorization header
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchActorMovies = async (id) => {
  try {
    const response = await fetch(
      `${APIURL}person/${id}/movie_credits?api_key=${APIKEY}`,
      options // Pass options including Authorization header
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

/* Search Movies */
export const fetchMovieSearch = async (search) => {
  try {
    const response = await fetch(
      `${APIURL}search/movie?api_key=${APIKEY}&language=en-US&query=${search}&include_adult=false&language=en-US&page=1`,
      options // Pass options including Authorization header
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null; // Return null or handle error appropriately
  }
};
