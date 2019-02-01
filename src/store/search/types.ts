import { IMovieInfo } from "@app/types";

interface IMovieSearch {
  searchResults: IMovieInfo[];
}

interface IMovieSearchActionTypes {
  type: MovieSearchTypes;
  data?: IMovieInfo[];
}

const enum MovieSearchTypes {
  SEARCH_MOVIE_REQUEST = "@@movie/SEARCH_REQUEST",
  SEARCH_MOVIE_SUCCESS = "@@movie/SEARCH_SUCCESS",
  SEARCH_MOVIE_ERROR = "@@movie/SEARCH_ERROR",
}

export { IMovieSearch, MovieSearchTypes, IMovieSearchActionTypes };
