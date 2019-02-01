import { Reducer } from "redux";
import {
  IMovieSearch,
  IMovieSearchActionTypes,
  MovieSearchTypes,
} from "./types";
import { initialMovieSearchState } from "./initial";

const searchReducer: Reducer<IMovieSearch> = (
  state: IMovieSearch = initialMovieSearchState,
  action: IMovieSearchActionTypes
) => {
  if (action.type === MovieSearchTypes.SEARCH_MOVIE_SUCCESS) {
    return {
      searchResults: action.data,
    };
  }

  return state;
};

export { searchReducer };
