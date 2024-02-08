import * as types from "../types"
const initialState = {
  itemOffset: 0,
  pageCount: 0,
  toggle_pagination: false,
  resetCount: false,
}
export const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ITEM_OFFSET:
      return {
        ...state,
        itemOffset: action.payload,
      }
    case types.SET_PAGE_COUNT:
      return {
        ...state,
        pageCount: action.payload,
      }
    case types.TOGGLE_PAGINATION:
      return {
        ...state,
        toggle_pagination: action.payload,
      }
    case types.RESET_PAGE_COUNT:
      return {
        ...state,
        resetCount: action.payload,
      }
    default:
      return state
  }
}