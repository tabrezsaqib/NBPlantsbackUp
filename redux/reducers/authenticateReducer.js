import * as types from "../types"
const initialState = {
  authentication_state: false,
  all_plants: []
}
export const authenticateReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATION_STATE:
      return {
        ...state,
        authentication_state: action.payload,
      }
    case types.ALL_PLANTS:
      return {
        ...state,
        all_plants: action.payload,
      }
    default:
      return state
  }
}
export { initialState };