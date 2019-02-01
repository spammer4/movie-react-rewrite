import * as React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { IMovieInfo } from "@app/types";
import { fetchMovieById, setMovie } from "@store/movie";
import { searchForMovie, IMovieSearch } from "@store/search";
import { IApplicationState } from "@store";
import { DEFAULT_MOVIE } from "@app/constants";
import { updateBackground } from "@app/utils";
import { FilmCard } from "./FilmCard";
import { SearchBox } from "./SearchBox";

interface IMovieAppProps {
  fetchMovieById?: (id: number) => void;
  searchForMovie?: (searchText: string) => void;
  setMovie?: (movie: IMovieInfo) => void;
  movie?: IMovieInfo;
  search?: IMovieSearch;
}

class MovieAppUnconnected extends React.Component<IMovieAppProps, {}> {
  constructor(props: IMovieAppProps) {
    super(props);

    this.movieSearch = this.movieSearch.bind(this);
    this.movieSelected = this.movieSelected.bind(this);
  }

  componentWillReceiveProps(props: IMovieAppProps) {
    if (props.movie.backdropUri) {
      updateBackground(props.movie.backdropUri);
    }
  }

  componentDidMount() {
    this.props.fetchMovieById(DEFAULT_MOVIE);
  }

  movieSearch(text: string) {
    this.props.searchForMovie(text);
  }

  movieSelected(movie: IMovieInfo) {
    if (movie) {
      this.props.setMovie(movie);
    }
  }

  render() {
    return (
      <div id="background__container">
        <div className="filmCard__Search__Container">
          <div className="search">
            <SearchBox handleSelect={ this.movieSelected } handleSearch={ this.movieSearch } movieList={ this.props.search.searchResults }/>
          </div>
          <FilmCard movieInfo={this.props.movie} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  movie: state.movieState,
  search: state.movieSearch,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    { fetchMovieById, searchForMovie, setMovie },
    dispatch
  );
};

const MovieApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieAppUnconnected);

export { MovieApp };
