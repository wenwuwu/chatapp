import _ from 'lodash';
import {
    SET_USER
} from '../actions';

function user (state = {}, action) {

    switch (action.type) {
        case SET_USER:
            const { id, name } = action;
            return { id, name };

        default:
            return state;
    }
}

export default user;
