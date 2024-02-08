import * as types from "../types"
import * as api from "../../generics/api"
import * as localStore from "../../generics/localStore"
const AUTH_URL = process.env.AUTH_URL

export const adminLogin = (params) => async (dispatch) => {
  const response = await api.adminLogin(`${AUTH_URL}`, params)
  console.log(response)
  localStore.setProfile(response.data.displayName)
  localStore.setToken(response.data.token)

  dispatch({
    type: types.POST_USERDATA,
    payload: response,
  })
}