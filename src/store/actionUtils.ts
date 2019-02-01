import { Dispatch } from "redux";
import axios, { AxiosResponse, AxiosError } from "axios";
import { IMovieInfo } from "@app/types";

export type transformFunction<S, D> = (source: S) => D;

interface IDictionary {
  [index: string]: string;
}

function queryEncode(params: IDictionary): string {
  return Object.keys(params)
    .map((key: string) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    })
    .join("&");
}

export interface IAction {
  requestType: string;
  successType: string;
  errorType: string;
  uri: string;
  data: {};
}

export interface IActionWithTransform<S, D> extends IAction {
  transformFunction?: transformFunction<S, D>;
}

export interface IActionError {
  name: string;
  message: string;
}

export const dispatchAction = (action: IAction, dispatch: Dispatch) => {
  const queryData: string = queryEncode(action.data);
  dispatch({ type: action.requestType });
  return axios
    .get(`${action.uri}?${queryData}`)
    .then((response: AxiosResponse) => {
      dispatch({
        type: action.successType,
        data: response.data,
      });
    })
    .catch((error: AxiosError) => {
      dispatch({
        type: action.errorType,
        error: { name: error.name, message: error.message } as IActionError,
      });
    });
};

export const dispatchActionWithTransform = <S, D>(
  action: IActionWithTransform<S, D>,
  dispatch: Dispatch
) => {
  const queryData: string = queryEncode(action.data);
  dispatch({ type: action.requestType });
  return axios
    .get(`${action.uri}?${queryData}`)
    .then((response: AxiosResponse) => {
      const transformedData: D = action.transformFunction(response.data);
      dispatch({
        type: action.successType,
        data: transformedData,
      });
    })
    .catch((error: AxiosError) => {
      dispatch({
        type: action.errorType,
        error: { name: error.name, message: error.message } as IActionError,
      });
    });
};

export const transform: transformFunction<
  any,
  IMovieInfo
> = function mapMovieInfo(movieJson: any): IMovieInfo {
  const movieInfo: IMovieInfo = {
    id: movieJson.id || 0,
    genres: movieJson.genres
      ? movieJson.genres.map((genre: any) => genre.name)
      : [],
    backdropUri: movieJson.backdrop_path || "",
    posterUri: movieJson.poster_path || "",
    budget: movieJson.budget || 0,
    releaseDate: movieJson.release_date || null,
    description: movieJson.overview || "",
    title: movieJson.title || "",
    voteAverage: movieJson.vote_average || 0,
    runningTime: movieJson.runtime || 0,
    productionCompanies: movieJson.production_companies
      ? movieJson.production_companies.map((company: any) => company.name)
      : [],
    tagLine: movieJson.tagline || "",
    boxOffice: movieJson.revenue || 0,
    fetching: false,
    error: null,
  };

  return movieInfo;
};
