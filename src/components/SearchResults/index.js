import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SearchResultItem from './SearchResultItem';

const propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object),
};

class SearchResults extends PureComponent {
  static propTypes = {
    searchResults: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const {searchResults} = this.props;

    if (!searchResults) {
      return <p>{'No results to display.'}</p>;
    }

    return searchResults.map(searchResultItem => (
      <SearchResultItem
        key={searchResultItem.etag}
        searchResultItem={searchResultItem}
      />
    ));
  }
}

SearchResults.propTypes = propTypes;

const mapStateToProps = ({ytSearch: {searchResults}}) => {
  return {searchResults};
};

export default connect(
  mapStateToProps,
  {}
)(SearchResults);
