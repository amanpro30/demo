import * as actionTypes from './actionTypes';

export const addItem = (item) => {
    return {
        type: actionTypes.ADD_ITEM,
        items: item
    }
}

export const delItem = (id) => {
    return {
        type: actionTypes.DEL_ITEM,
        id: id,
    }
}

export const reorderItem = (item) => {
    return {
        type: actionTypes.REORDER_ITEM,
        items: item,
    }
}