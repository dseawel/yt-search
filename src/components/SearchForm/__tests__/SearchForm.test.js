import React from 'react';
import renderer from 'react-test-renderer';
import {SearchForm} from 'components/SearchForm';

test('SearchForm renders without crashing', () => {
  let props = {
    error: {},
    fetchYouTubeSearchResults: jest.fn(),
    maxResults: '1',
    setMaxResults: jest.fn(),
    searchParam: null,
    setSearchParam: jest.fn(),
    searchSort: 'rating',
    setSearchSort: jest.fn(),
  };
  const emptyComponent = <SearchForm {...props} />;
  let rendered = renderer.create(emptyComponent).toJSON();
  expect(rendered).toMatchSnapshot();

  //test with updated search criteria
  props = {
    error: {},
    fetchYouTubeSearchResults: jest.fn(),
    maxResults: '10',
    setMaxResults: jest.fn(),
    searchParam: 'Jack Henry',
    setSearchParam: jest.fn(),
    searchSort: 'date',
    setSearchSort: jest.fn(),
  };
  const updatedComponent = <SearchForm {...props} />;
  rendered = renderer.create(updatedComponent).toJSON();
  expect(rendered).toMatchSnapshot();
});
