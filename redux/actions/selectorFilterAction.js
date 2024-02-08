import * as types from "../types"

export const activeFilterData = (option) => async (dispatch) => {
  dispatch({
    type: types.ACTIVE_SELECTOR_LIST,
    payload: option,
  })
}

export const selectorFilterData = (option) => async (dispatch) => {
  dispatch({
    type: types.SELECTOR_FILTER,
    payload: option,
  })
}