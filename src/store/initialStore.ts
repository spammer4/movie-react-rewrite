import { initialMovieState } from "./movie";
import { initialMovieSearchState } from "./search";
import { IApplicationState } from "./index";

const initialAppState: IApplicationState = {
  movieState: initialMovieState,
  movieSearch: initialMovieSearchState,
};

export default initialAppState;
