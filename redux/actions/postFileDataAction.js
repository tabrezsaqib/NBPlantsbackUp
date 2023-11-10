import * as types from "../types"
import * as api from "../../generics/api"
import { toast } from "react-toastify"
const API_POST_URL = process.env.API_POST_URL

// export const postFileData = (data) => async (dispatch) => {
//   const response = await api.post(`${API_URL}plants`, data)
//   console.log(response)
//   dispatch({
//     type: types.POST_JSONDATA,
//     payload: response,
//   })
// }
export const postFileData = (data) => async (dispatch) => {
  await api.post(`${API_POST_URL}plants_db`, data)
  console.log(data, "API_Call")
}