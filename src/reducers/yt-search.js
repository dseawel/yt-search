import * as types from 'constants';

export const INITIAL_STATE = {
  searchResults: [],
  loading: false,
  error: {},
  maxResults: '1',
  searchParam: null,
  searchSort: 'rating',
};

function mergeCommentTotal(searchResults, payload) {
  const {videoId, commentCount} = payload;
  return [
    ...searchResults.filter(result => result.id.videoId !== videoId),
    {
      ...searchResults.find(result => result.id.videoId === videoId),
      commentCount,
    },
  ];
}

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case types.RESET_STATE:
      return {...INITIAL_STATE};
    case types.FETCH_SEARCH_RESULTS_STARTED:
      return {...state, loading: true, error: {}};
    case types.FETCH_SEARCH_RESULTS_FINISHED_SUCCESS:
      return {...state, searchResults: payload, loading: false};
    case types.FETCH_SEARCH_RESULTS_FINISHED_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.SEARCH_PARAM_CHANGED:
      return {...state, ...payload};
    case types.SEARCH_SORT_CHANGED:
      return {...state, ...payload};
    case types.MAX_RESULTS_CHANGED:
      return {...state, ...payload};
    case types.FETCH_TOTAL_COMMENTS_FINISHED_SUCCESS:
      return {
        ...state,
        searchResults: mergeCommentTotal(state.searchResults, payload),
      };
    default:
      return state;
  }
};
