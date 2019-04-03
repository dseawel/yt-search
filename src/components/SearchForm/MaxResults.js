import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const propTypes = {
  classes: PropTypes.object,
  handlesetMaxResults: PropTypes.func,
  maxResults: PropTypes.string,
};

const styles = {
  maxResultsSelect: {
    width: 100,
  },
};

const MaxResults = ({classes, handlesetMaxResults, maxResults}) => (
  <FormControl>
    <InputLabel htmlFor="max">{'Max Results: '}</InputLabel>
    <Select
      id="max"
      onChange={value => handlesetMaxResults(value.target.value)}
      value={maxResults}
      className={classes.maxResultsSelect}
    >
      <MenuItem value={'1'}>{'1'}</MenuItem>
      <MenuItem value={'5'}>{'5'}</MenuItem>
      <MenuItem value={'10'}>{'10'}</MenuItem>
    </Select>
  </FormControl>
);

MaxResults.propTypes = propTypes;

export default withStyles(styles)(MaxResults);
