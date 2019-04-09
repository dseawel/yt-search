import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';

const propTypes = {
  handleSetSearchSort: PropTypes.func,
  searchSort: PropTypes.string,
};

const SearchSort = props => (
  <FormControl>
    <InputLabel htmlFor="sort">{'Sort by: '}</InputLabel>
    <Select
      id="sort"
      onChange={searchSort =>
        props.handleSetSearchSort(searchSort.target.value)
      }
      value={props.searchSort}
    >
      <MenuItem value={'date'}>{'Date'}</MenuItem>
      <MenuItem value={'rating'}>{'Rating'}</MenuItem>
      <MenuItem value={'relevance'}>{'Relevance'}</MenuItem>
    </Select>
  </FormControl>
);

SearchSort.propTypes = propTypes;

export default SearchSort;
