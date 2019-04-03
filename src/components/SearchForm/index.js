import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchYouTubeSearchResults,
  searchParamChanged,
  searchSortChanged,
} from 'actions/yt-search';
import SearchInput from './SearchInput';
import SearchSort from './SearchSort';
import {Button, CircularProgress} from '@material-ui/core';

export class SearchForm extends PureComponent {
  static propTypes = {
    error: PropTypes.object,
    fetchYouTubeSearchResults: PropTypes.func,
    searchParam: PropTypes.string,
    searchParamChanged: PropTypes.func,
    searchSort: PropTypes.string,
    searchSortChanged: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      displayErrors: false,
      isValid: false,
      loading: false,
      validationErrors: {},
    };
  }

  _handleSearch = async () => {
    await this._validateForm();
    if (this.state.isValid) {
      this.setState({loading: true});
      this.props
        .fetchYouTubeSearchResults(this.props)
        .then(() => {
          this.setState({loading: false});
        })
        .catch(error => {
          alert('Error from YouTube');
          console.log('error', error);
        });
    }
  };

  _validateForm = () => {
    const {searchParam} = this.props;
    const validationErrors = {};
    if (!searchParam || searchParam.length < 2) {
      validationErrors.searchParam = 'Search Parameter is missing';
    }
    this.setState({
      validationErrors,
      isValid: Object.keys(validationErrors).length === 0,
    });
  };

  _handleSearchParamChanged = searchParam => {
    this.props.searchParamChanged({searchParam});
  };

  _handleSearchSortChanged = searchSort => {
    this.props.searchSortChanged({searchSort});
  };

  render() {
    return (
      <div>
        <div>
          <SearchInput
            handleSearchParamChanged={this._handleSearchParamChanged}
            error={this.state.validationErrors.searchParam}
          />
        </div>
        <br />
        <div>
          <SearchSort
            handleSearchSortChanged={this._handleSearchSortChanged}
            searchSort={this.props.searchSort}
          />
        </div>
        <br />
        <div>
          <Button
            size="medium"
            color="primary"
            variant="contained"
            onClick={this._handleSearch}
          >
            {this.state.loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              'Search'
            )}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ytSearch}) => {
  return {...ytSearch};
};

export default connect(
  mapStateToProps,
  {fetchYouTubeSearchResults, searchParamChanged, searchSortChanged}
)(SearchForm);
