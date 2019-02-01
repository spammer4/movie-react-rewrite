import { Reducer } from "redux";

import { IMovieInfo } from "@app/types";
import { MovieActionTypes, IMovieActionTypes } from "./types";
import { initialMovieState } from "./initial";

const movieReducer: Reducer<IMovieInfo> = (
  state: IMovieInfo = initialMovieState,
  action: IMovieActionTypes
) => {
  switch (action.type) {
    case MovieActionTypes.FETCH_MOVIE_REQUEST: {
      return state;
    }
    case MovieActionTypes.FETCH_MOVIE_SUCCESS: {
      return action.data as IMovieInfo;
    }
    case MovieActionTypes.FETCH_MOVIE_ERROR: {
      return state;
    }
    case MovieActionTypes.SET_MOVIE: {
      return <IMovieInfo>action.data;
    }
    default:
      return state;
  }
};

export { movieReducer };
