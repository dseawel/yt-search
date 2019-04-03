import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const propTypes = {
  error: PropTypes.string,
  handleSearchParamChanged: PropTypes.func,
};

const SearchInput = props => (
  <FormControl>
    <InputLabel htmlFor="adornment-search">{'Search YouTube'}</InputLabel>
    <Input
      id="adornment-search"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      placeholder="Search"
      onChange={searchParam =>
        props.handleSearchParamChanged(searchParam.target.value)
      }
    />
    {props.error && <em>{props.error}</em>}
  </FormControl>
);

SearchInput.propTypes = propTypes;

export default SearchInput;
