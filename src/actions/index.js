import { genId } from '../utils/utils';

export const SET_USER = 'SET_USER'; 
export const SET_GROUPS_LIST = 'SET_GROUPS_LIST'; 
export const SELECT_GROUP = 'SELECT_GROUP'; 
export const UPDATE_GROUP_NAME = 'UPDATE_GROUP_NAME'; 
export const REMOVE_GROUP_NAME_EDITING = 'REMOVE_GROUP_NAME_EDITING'; 
export const REMOVE_USER_NAME_EDITING = 'REMOVE_USER_NAME_EDITING'; 
export const SET_GROUP_NAME_EDITING = 'SET_GROUP_NAME_EDITING'; 
export const SET_USER_NAME_EDITING = 'SET_USER_NAME_EDITING'; 
export const NEW_GROUP = 'NEW_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const NEW_USER_IN_GROUP = 'NEW_USER_IN_GROUP';
export const DONE_WITH_ADDING_GROUP = 'DONE_WITH_ADDING_GROUP';
export const DONE_WITH_ADDING_USER_IN_GROUP = 'DONE_WITH_ADDING_USER_IN_GROUP';
export const SET_ADDING_GROUP = 'SET_ADDING_GROUP';
export const SET_ADDING_USER_IN_GROUP = 'SET_ADDING_USER_IN_GROUP';
export const DELETE_USER_FROM_GROUP = 'DELETE_USER_FROM_GROUP'; 
export const EDIT_USER_NAME_IN_GROUP = 'EDIT_USER_NAME_IN_GROUP';

export const GET_GROUP = 'GET_GROUP'; 
export const NEW_MESSAGE = 'NEW_MESSAGE';

export function setUser (id, name) {
    return {
        type: SET_USER,
        id,
        name,
    };
}
export function deleteGroup (id) {
    return {
        type: DELETE_GROUP,
        id,
    };
}
export function editUserName (groupId, user) {
    return {
        type: EDIT_USER_NAME_IN_GROUP,
        groupId,
        user,
    };
}
export function newUserInGroup (groupId, user) {
    return {
        type: NEW_USER_IN_GROUP,
        groupId,
        user,
    };
}
export function deleteUserFromGroup (groupId, id) {
    return {
        type: DELETE_USER_FROM_GROUP,
        groupId,
        id,
    };
}
export function updateGroupName (id, name) {
    return {
        type: UPDATE_GROUP_NAME,
        id,
        name,
    };
}
export function setUserNameEditing (id) {
    return {
        type: SET_USER_NAME_EDITING,
        id,
    };
}
export function setGroupNameEditing (id) {
    return {
        type: SET_GROUP_NAME_EDITING,
        id,
    };
}
export function removeUserNameEditing (id) {
    return {
        type: REMOVE_USER_NAME_EDITING,
        id,
    };
}
export function removeGroupNameEditing (id) {
    return {
        type: REMOVE_GROUP_NAME_EDITING,
        id,
    };
}
export function selectGroup (id) {
    return {
        type: SELECT_GROUP,
        id,
    };
}
export function setAddingUserInGroup () {
    return {
        type: SET_ADDING_USER_IN_GROUP,
    };
}
export function setAddingGroup () {
    return {
        type: SET_ADDING_GROUP,
    };
}
export function doneWithAddingUserInGroup () {
    return {
        type: DONE_WITH_ADDING_USER_IN_GROUP,
    };
}
export function doneWithAddingGroup () {
    return {
        type: DONE_WITH_ADDING_GROUP,
    };
}
export function setGroupsList (groupsList) {
    return {
        type: SET_GROUPS_LIST,
        groupsList,
    };
}
export function newGroup (groupData) {
    return {
        type: NEW_GROUP,
        ...groupData,
    };
}

export function getUserInfo () {
    return (dispatch, getState) => {
        return fetch('/user-info')
            .then(rsp => rsp.json())
            .then(data => {
                console.log(data);
                const { status, user } = data;
                const { id, name } = user;
                if (status === 200) {
                    dispatch(setUser(id, name));
                }
                else {
                    throw data;
                }
            })
            .catch(({status, message}) => {
                alert(`Status: ${status}, Message: ${message}`);
            });
    };
}
export function getGroups () {
    return (dispatch, getState) => {
        return fetch('/groups')
            .then(rsp => rsp.json())
            .then(data => {
                console.log(data);
                const { status, groups } = data;
                if (status === 200) {
                    dispatch(setGroupsList(groups));
                }
                else {
                    throw data;
                }
            })
            .catch(({status, message}) => {
                alert(`Status: ${status}, Message: ${message}`);
            });
    };
}

export function createNewGroup (data) {
    return (dispatch, getState) => {
        return fetch('/new-group', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(rsp => rsp.json())
        .then(data => {
            const { status } = data;
            if (status === 200) {
                dispatch(doneWithAddingGroup());
            }
            else {
                throw data;
            }
        })
        .catch(({status, message}) => {
            alert(`Status: ${status}, Message: ${message}`);
        });
    };
}
export function postGroupName (data) {
    return (dispatch, getState) => {
        return fetch('/edit-group-name', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then()
        .catch(err => {
            alert('Failed to update group name, please try again.');
        });
    };
}
export function postDeleteGroup (data) {
    return (dispatch, getState) => {
        return fetch('/delete-group', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then()
        .catch(err => {
            alert('Failed to delete group, please try again.');
        });
    };
}
export function postNewUserInGroup (data) {
    return (dispatch, getState) => {
        return fetch('/new-user-in-group', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(rsp => rsp.json())
        .then(data => {
            const { status, groupId, user } = data;
            if (status === 200) {
                dispatch(doneWithAddingUserInGroup());
            }
            else {
                throw data;
            }
        })
        .catch(({status, message}) => {
            alert(`Status: ${status}, Message: ${message}`);
        });
    };
}
export function postDeleteUserInGroup (data) {
    return (dispatch, getState) => {
        return fetch('/delete-user-from-group', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(rsp => rsp.json())
        .then(data => {
            const { status, groupId, user } = data;
            if (status === 200) {
            }
            else {
                throw data;
            }
        })
        .catch(({status, message}) => {
            alert(`Status: ${status}, Message: ${message}`);
        });
    };
}
export function postUserName (data) {
    return (dispatch, getState) => {
        return fetch('/edit-user-name-in-group', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(rsp => rsp.json())
        .then(data => {
            const { status, groupId, user } = data;
            if (status === 200) {
            }
            else {
                throw data;
            }
        })
        .catch(({status, message}) => {
            alert(`Status: ${status}, Message: ${message}`);
        });
    };
}
