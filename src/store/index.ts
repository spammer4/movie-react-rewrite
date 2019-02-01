import { combineReducers } from "redux";
import { IMovieInfo } from "@app/types";
import { movieReducer } from "./movie";
import { searchReducer, IMovieSearch } from "./search";
import { Promise } from "es6-promise";

import store from "./configureStore";

global.Promise = Promise; // needed for IE11

export interface IApplicationState {
  movieState: IMovieInfo;
  movieSearch: IMovieSearch;
}

export const rootReducer = combineReducers<IApplicationState>({
  movieState: movieReducer,
  movieSearch: searchReducer,
});

export default store();
