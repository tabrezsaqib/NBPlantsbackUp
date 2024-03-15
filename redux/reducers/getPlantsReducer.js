import * as types from "../types"
const initialState = {
  all_plants: [],
  group_by_c_rank: [],
  woody_plants: [],
  ferns: [],
  grass_like_plants: [],
  nonwoody_plants: [],
  plant_details: [],
  search_results: [],
  isLoading: true,
  all_plants_count: 0,
  nonwoody_plants_count: 0,
  woody_plants_count: 0,
  popoverData: [],
  popoverStatus: false,
  plantFamily: [],
  plantsError:false,
  searchError: false
}
export const getPlantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_PLANTS:
      return {
        ...state,
        all_plants: action.payload,
        plantsError: false
      }
    case types.IS_ERROR:
      return {
        ...state,
        plantsError: true,
        isLoading: false,
      }
    case types.IS_ERROR_SEARCH:
      return {
        ...state,
        searchError: true,
        isLoading: false,
      }
    case types.GET_NONWOODY_PLANTS:
      return {
        ...state,
        nonwoody_plants: action.payload,
        plantsError: false
      }
    case types.GET_WOODY_PLANTS:
      return {
        ...state,
        woody_plants: action.payload,
        plantsError: false
      }
    case types.GET_FERNS_DATA:
      return {
        ...state,
        ferns: action.payload,
        plantsError: false
      }
    case types.GET_GRASS_LIKE_PLANTS:
      return {
        ...state,
        grass_like_plants: action.payload,
        plantsError: false
      }
    case types.GET_PLANT:
      return {
        ...state,
        plant_details: action.payload,
      }
    case types.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
        plantsError: false
      }
    case types.GET_SEARCH_RESULTS:
      return {
        ...state,
        search_results: action.payload,
        searchError: false
      }
    case types.GET_ALL_PLANTS_COUNT:
      return {
        ...state,
        all_plants_count: action.payload,
      }
    case types.GET_ALL_NONWOODY_PLANTS_COUNT:
      return {
        ...state,
        nonwoody_plants_count: action.payload,
      }
    case types.GET_ALL_WOODY_PLANTS_COUNT:
      return {
        ...state,
        woody_plants_count: action.payload,
      }
    case types.GET_POPOVER_DATA:
      return {
        ...state,
        popoverData: action.payload,
      }
    case types.TRIGGER_TOOLTIP_POPUP:
      return {
        ...state,
        popoverStatus: action.payload,
      }
    case types.PLANT_FAMILY_DETAILS:
      return {
        ...state,
        plantFamily: action.payload,
      }
    default:
      return state
  }
}