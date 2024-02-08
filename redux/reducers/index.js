import { combineReducers } from "redux"
import { getPlantsReducer } from "./getPlantsReducer"
import { loginReducer } from "./loginReducer"
import { selectorsReducer } from "./selectorsReducer"
import { paginationReducer } from "./paginationReducer"
import {authenticateReducer} from "./authenticateReducer"


export default combineReducers({
  post: getPlantsReducer,
  user: loginReducer,
  pagination: paginationReducer,
  selector: selectorsReducer,
  authenticate: authenticateReducer,
})