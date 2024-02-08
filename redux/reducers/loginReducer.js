import * as types from "../types"
const initialState = {
  user_data: [],
}
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.POST_USERDATA:
      return {
        ...state,
        user_data: action.payload,
      }
    default:
      return state
  }
}