import { IMovieInfo } from "@app/types";

interface IFetchingMovie {
  readonly type: MovieActionTypes;
}

interface ISetMovieAction {
  readonly type: MovieActionTypes.SET_MOVIE;
  readonly data: IMovieInfo;
}

interface IFetchMovieStatus {
  readonly type: MovieActionTypes;
  readonly movieId: number;
}

interface IMovieActionTypes {
  type: MovieActionTypes;
  data?: {};
}

const enum MovieActionTypes {
  FETCH_MOVIE_REQUEST = "@@movie/FETCH_REQUEST",
  FETCH_MOVIE_SUCCESS = "@@movie/FETCH_SUCCESS",
  FETCH_MOVIE_ERROR = "@@movie/FETCH_ERROR",
  SET_MOVIE = "@@movie/SET_MOVIE",
}

export {
  IFetchingMovie,
  IFetchMovieStatus,
  MovieActionTypes,
  IMovieActionTypes,
  ISetMovieAction,
};
