import * as React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { IMovieInfo } from "@app/types";

const TMDBLogo = "./images/tmdb.svg";

interface ISearchBoxProps {
  movieList: IMovieInfo[];
  handleSearch: (searchText: string) => void;
  handleSelect: (selected: IMovieInfo) => void;
}

const SearchBox: React.SFC<ISearchBoxProps> = ({
  movieList,
  handleSearch,
  handleSelect,
}): JSX.Element => {
  return (
    <React.Fragment>
        <div className="searchbox__logo">
          <a href="./" title="ReactJS TMDb Movie Search">
            <img src={TMDBLogo} className="logo" alt="The Movie Database" />
          </a>
        </div>
        <div className="searchbox__searchfield">
          <form className="searchbox__form">
            <Typeahead
              labelKey="title"
              onChange={(selected: any[]) => handleSelect(selected[0])}
              onInputChange={(text: string) => handleSearch(text)}
              options={movieList}
              placeholder="Search Movie Title..."
            />
          </form>
        </div>
      </React.Fragment>
  );
};

export { SearchBox };
