import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const propTypes = {
  error: PropTypes.string,
  handlesetSearchParam: PropTypes.func,
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
      placeholder="Keyword"
      onChange={searchParam =>
        props.handlesetSearchParam(searchParam.target.value)
      }
    />
    {props.error && <Typography component="em">{props.error}</Typography>}
  </FormControl>
);

SearchInput.propTypes = propTypes;

export default SearchInput;
