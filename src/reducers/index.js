
import { combineReducers } from 'redux';
import _ from 'lodash';
import {
  CREATE_CARD, UPDATE_CARD, DELETE_CARD
} from '../actions';

function cards (state = [], action) {
    let idx

    switch (action.type) {
        case CREATE_CARD:
            return [
                {
                    id: action.id,
                    name: action.name
                },
                ...state
            ]

        case UPDATE_CARD:
            idx = _.findIndex(state, {id: action.id})
            const card = {
                id: action.id,
                name: action.name
            }
            return [
                ...state.slice(0, idx),
                card,
                ...state.slice(idx + 1)
            ]

        case DELETE_CARD:
            idx = _.findIndex(state, {id: action.id})
            return [
                ...state.slice(0, idx),
                ...state.slice(idx + 1)
            ]

        default:
            return state
    }
}

const rootReducer = combineReducers({
    cards
});

export default rootReducer;
