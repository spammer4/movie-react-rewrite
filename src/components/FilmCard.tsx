import * as React from "react";

import { IMovieInfo } from "@app/types";
import * as constants from "@app/constants";
import { commaStringArray, currencyNumber } from "@app/utils";

interface IMovieInfoProp {
  movieInfo: IMovieInfo;
}

const FilmCard: React.SFC<IMovieInfoProp> = (movieInfoProp): JSX.Element => {
  const formattedBoxOffice = currencyNumber(movieInfoProp.movieInfo.boxOffice);
  return (
    <React.Fragment>
      <div className="filmCard">
        <div className="filmCard__movieposter">
          <img
            className="poster"
            src={`${constants.POSTER_URL_PREFIX}${
              movieInfoProp.movieInfo.posterUri
            }`}
          />
        </div>
        <div className="filmCard__movieinfo__container">
          <div className="filmCard__movieinfo__content">
            <h1>{movieInfoProp.movieInfo.title}</h1>
            <h2>{movieInfoProp.movieInfo.tagLine}</h2>
            <p>{movieInfoProp.movieInfo.description}</p>
            <h2>{commaStringArray(movieInfoProp.movieInfo.genres)}</h2>
            <p>
              {commaStringArray(movieInfoProp.movieInfo.productionCompanies)}
            </p>
            <div className="filmCard__movieinfo__content__facts">
              <span>
                <p>Original Release:</p>
                <p>{movieInfoProp.movieInfo.releaseDate}</p>
              </span>
              <span>
                <p>Running Time:</p>
                <p>{movieInfoProp.movieInfo.runningTime} mins</p>
              </span>
            </div>
            <div className="filmCard__movieinfo__content__facts">
              <span>
                <p>Box Office:</p>
                <p>{formattedBoxOffice}</p>
              </span>
              <span>
                <p>Vote Average:</p>
                <p>{movieInfoProp.movieInfo.voteAverage} / 10</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { FilmCard };
