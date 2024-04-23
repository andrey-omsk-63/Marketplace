import { combineReducers } from 'redux';
import { massdkReducer } from './massdkReducer';
import { massrouteReducer } from './massrouteReducer';
import { massrouteproReducer } from './massrouteproReducer';
import { statsaveReducer } from './statsaveReducer';

export const rootReducer = combineReducers({
  massdkReducer,
  massrouteReducer,
  massrouteproReducer,
  statsaveReducer,
});
