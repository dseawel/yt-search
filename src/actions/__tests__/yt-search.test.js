jest.mock('services/requester', () => ({
  sendGet: jest.fn(() => Promise.resolve([])),
}));

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from 'actions/yt-search';
import * as types from 'constants';
import {INITIAL_STATE} from 'reducers/yt-search';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchYouTubeSearchResults', () => {
  let store = null;

  beforeEach(() => {
    store = mockStore({
      ytSearch: {
        ...INITIAL_STATE,
        searchParam: 'test',
      },
    });
  });

  test('dispatches FETCH_SEARCH_RESULTS_STARTED', () => {
    return store.dispatch(actions.fetchYouTubeSearchResults()).then(() => {
      const calledActions = store.getActions();
      expect(calledActions[0]).toEqual({
        type: types.FETCH_SEARCH_RESULTS_STARTED,
      });
    });
  });
});

describe('setSearchParam', () => {
  test('dispatches the right event', () => {
    const expected = {
      type: types.SEARCH_PARAM_CHANGED,
      payload: 1,
    };
    expect(actions.setSearchParam(1)).toEqual(expected);
  });
});

describe('setSearchSort', () => {
  test('dispatches the right event', () => {
    const expected = {
      type: types.SEARCH_SORT_CHANGED,
      payload: 1,
    };
    expect(actions.setSearchSort(1)).toEqual(expected);
  });
});

describe('setMaxResults', () => {
  test('dispatches the right event', () => {
    const expected = {
      type: types.MAX_RESULTS_CHANGED,
      payload: 1,
    };
    expect(actions.setMaxResults(1)).toEqual(expected);
  });
});
