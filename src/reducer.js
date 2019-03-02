import { combineReducers } from 'redux';

import { loadingReducer } from 'feature/Loading/redux/reducer';
import { todoReducer } from 'feature/Todo/redux/reducer';

export default combineReducers({
  loading: loadingReducer,
  todo: todoReducer,
});

