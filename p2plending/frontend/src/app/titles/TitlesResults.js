/* eslint-disable no-console */
import React, { Component } from "react";
import SearchBar from "../../components/SearchBar";
import * as api from "../backendCalls";
import TitleItem from "./TitleItem";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { hasParamInUrlChanged } from "../../components/componentUtils/routerUrls";

//Your initialization

class TitlesResultView extends Component {
  static defaultProps = {
    titles: PropTypes.array,
    searchString: PropTypes.string,
  }

  render () {
    let { searchString, titles } = this.props;

    return (
      <div id="container p-4 my-5">
        <div
          className="opening-blurb border rounded p-4 text-center text-white bg-primary"
        >
          <span role="img" aria-label="emoji" style={{fontSize: 50}}>
            📚
          </span>
          <h2 className="m-0">Search Results: { searchString }</h2>
        </div>

        <div className="flex-container pt-2"> 
          <SearchBar
          />
        </div>

        <div className="container container--full px-4 my-5">
          <div className="row">
            {titles.map(item => (
              <TitleItem key={item.id} title={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
} 

class TitlesResults extends Component {
  static defaultProps = { match: { params: {} } };

  state = {
    searchString: "",
    titles: []
  }
  
  fetchTitlesAndUpdateState = () => {
    const { params } = this.props.match;
    if (params.searchTerm != undefined ) {
      api.searchContentTitles(params.searchTerm).then(({ data }) => {
        this.setState({ titles: data, searchString: params.searchTerm  });
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (!hasParamInUrlChanged(prevProps.match, this.props.match, "searchTerm")) {
      return;
    }

    this.fetchTitlesAndUpdateState();
  }

  componentDidMount() {
    this.fetchTitlesAndUpdateState();
  }

  render() {
    const { searchString, titles } = this.state
    
    return (
        <TitlesResultView searchString={searchString} titles={titles} />
    );
  }
}

export default withRouter(TitlesResults);
