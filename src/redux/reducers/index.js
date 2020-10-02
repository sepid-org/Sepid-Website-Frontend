import { combineReducers } from 'redux';
import account from './account';
import notifications from './notifications';
import { IntlReducer as Intl } from 'react-redux-multilingual';

const allReducers = combineReducers({
  account,
  notifications,
  Intl,
});
export default allReducers;