import * as types from "../types"

export const setItemOffset = (option) => async (dispatch) => {
  dispatch({
    type: types.SET_ITEM_OFFSET,
    payload: option,
  })
}

export const setPageCount = (option) => async (dispatch) => {
  dispatch({
    type: types.SET_PAGE_COUNT,
    payload: option,
  })
}
export const resetPageCount = (option) => async (dispatch) => {
  dispatch({
    type: types.RESET_PAGE_COUNT,
    payload: option,
  })
}
export const togglePagination = (option) => async (dispatch) => {
  dispatch({
    type: types.TOGGLE_PAGINATION,
    payload: option,
  })
}