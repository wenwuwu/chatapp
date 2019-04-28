import _ from 'lodash';
import {
    NEW_GROUP, 
    SET_GROUPS_LIST, 
    SELECT_GROUP, 
    UPDATE_GROUP_NAME, 
    REMOVE_GROUP_NAME_EDITING, 
    REMOVE_USER_NAME_EDITING,
    SET_GROUP_NAME_EDITING,
    DELETE_GROUP,
    SET_USER_NAME_EDITING,
    NEW_USER_IN_GROUP,
    DONE_WITH_ADDING_GROUP,
    DONE_WITH_ADDING_USER_IN_GROUP,
    SET_ADDING_GROUP,
    SET_ADDING_USER_IN_GROUP,
    DELETE_USER_FROM_GROUP,
    EDIT_USER_NAME_IN_GROUP,
    NEW_MESSAGE,
} from '../actions';

const defaultState = {
    activeGroupId: -1,
    currentEditingGroupId: -1,
    currentEditingUserId: -1,
    isAddingGroup: false,
    isAddingUserInGroup: false,
    list: [],
};

function groups (state = defaultState, action) {
    // const newState = _.pick(state, ['activeGroupId', 'currentEditingGroupId', 'currentEditingUserId']);
    let obj = _.clone(state);
    let list;
    let first;
    let idx;
    let users;

    switch (action.type) {
        case NEW_GROUP:
            obj.list = [
                ...state.list,
                _.pick(action, ['id', 'name', 'messages', 'users']),
            ];
            obj.activeGroupId = action.id;
            obj.currentEditingGroupId = action.id;
            return obj;

        case SET_GROUPS_LIST:
            list = action.groupsList.slice(0);
            obj.list = list;
            first = list[0];
            if (first) {
                obj.activeGroupId = first.id;
            }
            return obj;

        case REMOVE_GROUP_NAME_EDITING:
            obj.currentEditingGroupId = -1;
            return obj;

        case SET_GROUP_NAME_EDITING:
            obj.currentEditingGroupId = action.id;
            return obj;

        case SELECT_GROUP:
            obj.activeGroupId = action.id;
            return obj;

        case DELETE_GROUP:
            const id = action.id;
            list = obj.list.slice(0);
            idx = _.findIndex(list, {id});
            list.splice(idx, 1);
            
            if (id === obj.currentEditingGroupId) {
                obj.currentEditingGroupId = -1;
            }
            if (id === obj.activeGroupId) {
                if (list.length > 0) {
                    obj.activeGroupId = list[0].id;
                }
                else {
                    obj.activeGroupId = -1;
                }
            }
            obj.list = list;

            return obj;

        case UPDATE_GROUP_NAME:
            list = state.list.slice(0);
            const item = _.find(list, {id: action.id});
            item.name = action.name;

            obj.list = list;
            obj.currentEditingGroupId = -1;

            return obj;

        case SET_ADDING_GROUP:
            obj.isAddingGroup = true;
            return obj;

        case DONE_WITH_ADDING_GROUP:
            obj.isAddingGroup = false;
            obj.currentEditingGroupId = -1;
            return obj;

        case SET_ADDING_USER_IN_GROUP:
            obj.isAddingUserInGroup = true;
            return obj;

        case DONE_WITH_ADDING_USER_IN_GROUP:
            obj.isAddingUserInGroup = false;
            return obj;

        case SET_USER_NAME_EDITING:
            obj.currentEditingUserId = action.id;
            return obj;

        case NEW_USER_IN_GROUP:
            obj = _.cloneDeep(state);
            const group = _.find(obj.list, {id: action.groupId});
            group.users.push(action.user);
            return obj;

        case EDIT_USER_NAME_IN_GROUP:
            obj = _.cloneDeep(state);
            users = _.find(obj.list, {id: action.groupId}).users;
            const user = _.find(users, {id: action.user.id});
            user.name = action.user.name;
            return obj;

        case DELETE_USER_FROM_GROUP:
            obj = _.cloneDeep(state);
            users = _.find(obj.list, {id: action.groupId}).users;
            idx = _.findIndex(users, {id: action.id});
            users.splice(idx, 1);

            return obj;

        case REMOVE_USER_NAME_EDITING:
            obj.currentEditingUserId = -1;
            return obj;

        case NEW_MESSAGE:
            obj = _.cloneDeep(state);
            const msgs = _.find(obj.list, {id: action.id}).messages;
            msgs.push(action.message);
            return obj;

        default:
            return state;
    }
}

export default groups;
