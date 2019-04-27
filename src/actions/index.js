
export const CREATE_CARD = 'CREATE_CARD'
export const UPDATE_CARD = 'UPDATE_CARD'
export const DELETE_CARD = 'DELETE_CARD'

export function createCard (name) {
    return {
        type: CREATE_CARD,
        id: name + Date.now(),
        name
    }
}

export function updateCard (id, name) {
    return {
        type: UPDATE_CARD,
        id,
        name
    }
}

export function deleteCard (id) {
    return {
        type: DELETE_CARD,
        id
    }
}
