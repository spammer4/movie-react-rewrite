import { Dispatch } from "redux";
import { IMovieInfo } from "@app/types";
import { MovieSearchTypes } from "./types";
import {
  dispatchActionWithTransform,
  transformFunction,
  transform,
  IActionWithTransform,
} from "@store/actionUtils";
import * as constants from "@app/constants";

interface ISearchResults {
  page: number;
  total_results: number;
  total_pages: number;
  results: [];
}

const transformMovieList: transformFunction<
  any,
  IMovieInfo[]
> = function mapMovieArray(movieJson: ISearchResults): IMovieInfo[] {
  return movieJson.results.map(movie => transform(movie));
};

export const searchForMovie = (searchText: string) => (dispatch: Dispatch) => {
  if (searchText === "") {
    return;
  }
  const uri = `${constants.MDB_SEARCH_URL}`;
  const searchForMovieAction: IActionWithTransform<any, IMovieInfo[]> = {
    errorType: MovieSearchTypes.SEARCH_MOVIE_ERROR,
    requestType: MovieSearchTypes.SEARCH_MOVIE_REQUEST,
    successType: MovieSearchTypes.SEARCH_MOVIE_SUCCESS,
    data: { query: `${searchText}`, api_key: constants.MDB_API_KEY },
    uri,
    transformFunction: transformMovieList,
  };
  dispatchActionWithTransform(searchForMovieAction, dispatch);
};
