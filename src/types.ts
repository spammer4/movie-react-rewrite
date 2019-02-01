interface IMovieInfo {
  id: number;
  genres: string[];
  backdropUri: string;
  posterUri: string;
  budget: number;
  releaseDate: Date;
  description: string;
  title: string;
  voteAverage: number;
  runningTime: number;
  productionCompanies: string[];
  tagLine: string;
  boxOffice: number;
  fetching: boolean;
  error: Error;
}

export { IMovieInfo };
