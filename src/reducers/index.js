import { combineReducers } from 'redux';
import groups from './groups';
import user from './user';

const rootReducer = combineReducers({
    groups,
    user,
});

export default rootReducer;
