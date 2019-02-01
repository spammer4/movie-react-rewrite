import { Dispatch } from "redux";
import { IMovieInfo } from "@app/types";
import { MovieActionTypes, ISetMovieAction } from "./types";
import * as constants from "@app/constants";
import {
  dispatchActionWithTransform,
  transform,
  IActionWithTransform,
} from "@store/actionUtils";

const fetchMovieById = (id: number) => (dispatch: Dispatch) => {
  const uri = `${constants.MDB_MOVIE_URL}/${id}`;
  const fetchMovieAction: IActionWithTransform<any, IMovieInfo> = {
    errorType: MovieActionTypes.FETCH_MOVIE_ERROR,
    requestType: MovieActionTypes.FETCH_MOVIE_REQUEST,
    successType: MovieActionTypes.FETCH_MOVIE_SUCCESS,
    data: { api_key: constants.MDB_API_KEY },
    uri,
    transformFunction: transform,
  };
  console.log(fetchMovieAction);
  dispatchActionWithTransform(fetchMovieAction, dispatch);
};

const setMovie = (movieInfo: IMovieInfo) => (dispatch: Dispatch) => {
  const movie: ISetMovieAction = {
    type: MovieActionTypes.SET_MOVIE,
    data: movieInfo,
  };

  dispatch(movie);
};

export { fetchMovieById, setMovie };
