import * as types from 'constants';
import * as endpoints from 'config/endpoints';
import * as requester from 'services/requester';

export function setSearchParam(payload) {
  return {
    type: types.SEARCH_PARAM_CHANGED,
    payload,
  };
}

export function setSearchSort(payload) {
  return {
    type: types.SEARCH_SORT_CHANGED,
    payload,
  };
}

export function setMaxResults(payload) {
  return {
    type: types.MAX_RESULTS_CHANGED,
    payload,
  };
}

export function fetchYouTubeSearchResults() {
  return (dispatch, getState) => {
    dispatch({type: types.FETCH_SEARCH_RESULTS_STARTED});
    const {
      ytSearch: {searchParam, searchSort, maxResults},
    } = getState();

    const url = `${
      endpoints.YT_SEARCH
    }?part=snippet&q=${searchParam.toLowerCase()}&key=${
      process.env.YT_API_KEY
    }&maxResults=${maxResults}&order=${searchSort}`;
    return requester
      .sendGet(url)
      .then(result => {
        if (result && result.data) {
          dispatch({
            type: types.FETCH_SEARCH_RESULTS_FINISHED_SUCCESS,
            payload: result && result.data ? result.data.items : [],
          });
          dispatch(fetchTotalComments());
        }
      })
      .catch(error => {
        dispatch({
          type: types.FETCH_SEARCH_RESULTS_FINISHED_ERROR,
          payload: error,
        });
        return Promise.reject(error);
      });
  };
}

function fetchTotalComments() {
  return (dispatch, getState) => {
    const {
      ytSearch: {searchResults},
    } = getState();
    searchResults.forEach(searchResult => {
      const {
        id: {videoId},
      } = searchResult;
      const url = `${
        endpoints.YT_VIDEO_DETAILS
      }?part=statistics&id=${videoId}&key=${process.env.YT_API_KEY}`;
      return requester
        .sendGet(url)
        .then(result => {
          if (result && result.data) {
            dispatch({
              type: types.FETCH_TOTAL_COMMENTS_FINISHED_SUCCESS,
              payload: {
                videoId,
                commentCount:
                  result && result.data
                    ? result.data.items[0].statistics.commentCount
                    : 0,
              },
            });
          }
        })
        .catch(error => {
          console.log('error', error)
          return Promise.reject(error.Message);
        });
    });
  };
}
