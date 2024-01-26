import * as types from "../types"
import * as api from "../../generics/api"
const API_URL = process.env.API_URL

export const authenticateAction = (response) => async (dispatch) => {
  dispatch({
    type: types.AUTHENTICATION_STATE,
    payload: response,
  })
}

export const getAllPlantsAction = () => async (dispatch) => {
  const resp = await api.get(`${API_URL}plants_db`)
  dispatch({
    type: types.ALL_PLANTS,
    payload: resp.data,
  })
}