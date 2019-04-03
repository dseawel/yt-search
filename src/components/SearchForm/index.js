import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchYouTubeSearchResults,
  setMaxResults,
  setSearchParam,
  setSearchSort,
} from 'actions/yt-search';
import SearchInput from './SearchInput';
import SearchSort from './SearchSort';
import MaxResults from './MaxResults';
import {Button, CircularProgress} from '@material-ui/core';

export class SearchForm extends PureComponent {
  static propTypes = {
    error: PropTypes.object,
    fetchYouTubeSearchResults: PropTypes.func,
    maxResults: PropTypes.string,
    searchParam: PropTypes.string,
    searchSort: PropTypes.string,
    setMaxResults: PropTypes.func,
    setSearchParam: PropTypes.func,
    setSearchSort: PropTypes.func,
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
          //console.log('error', error);
        });
    }
  };

  _validateForm = () => {
    const {searchParam} = this.props;
    const validationErrors = {};
    if (!searchParam || searchParam.length < 2) {
      validationErrors.searchParam = 'Search keyword is missing';
    }
    this.setState({
      validationErrors,
      isValid: Object.keys(validationErrors).length === 0,
    });
  };

  _handlesetSearchParam = searchParam => {
    this.props.setSearchParam({searchParam});
  };

  _handlesetSearchSort = searchSort => {
    this.props.setSearchSort({searchSort});
  };

  _handlesetMaxResults = maxResults => {
    this.props.setMaxResults({maxResults});
  };

  render() {
    return (
      <div>
        <div>
          <SearchInput
            handlesetSearchParam={this._handlesetSearchParam}
            error={this.state.validationErrors.searchParam}
          />
          &nbsp;
          <MaxResults
            handlesetMaxResults={this._handlesetMaxResults}
            maxResults={this.props.maxResults}
          />
          &nbsp;
          <SearchSort
            handlesetSearchSort={this._handlesetSearchSort}
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
  {
    fetchYouTubeSearchResults,
    setMaxResults,
    setSearchParam,
    setSearchSort,
  }
)(SearchForm);
