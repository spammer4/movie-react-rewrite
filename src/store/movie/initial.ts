import { IMovieInfo } from "@app/types";

const initialMovieState: IMovieInfo = {
  id: 0,
  backdropUri: null,
  posterUri: null,
  boxOffice: null,
  budget: null,
  description: null,
  genres: [],
  productionCompanies: [],
  releaseDate: null,
  runningTime: null,
  tagLine: null,
  title: null,
  voteAverage: null,
  fetching: false,
  error: null,
};

export { initialMovieState };
