import React from 'react';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import reducers from 'reducers';
import {SearchForm, SearchResults} from 'components';

const store = createStore(
  combineReducers({...reducers}),
  applyMiddleware(thunkMiddleware)
);

const Index = () => (
  <Provider store={store}>
    <div>
      <SearchForm />
      <SearchResults />
    </div>
  </Provider>
);

export default Index;
