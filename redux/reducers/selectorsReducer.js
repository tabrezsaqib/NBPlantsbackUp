import * as types from "../types"
import * as options from "../../data/sideNavListDataArray"

const initialState = {
  plant_type: new Array(options.plant_type.length).fill(false),
  type: new Array(options.type.length).fill(false),
  habitat: new Array(options.habitat.length).fill(false),
  flower_colour: new Array(options.flower_colour.length).fill(false),
  lip_shape: new Array(options.lip_shape.length).fill(false),
  leaf_blade_edges: new Array(options.leaf_blade_edges.length).fill(false),
  leaf_type: new Array(options.leaf_type.length).fill(false),
  leaf_duration: new Array(options.leaf_duration.length).fill(false),
  leaflet_divisions: new Array(options.leaflet_divisions.length).fill(false),
  leaf_arrangement: new Array(options.leaf_arrangement.length).fill(false),
  // new_brunswick_county: new Array(options.new_brunswick_county.length).fill(
  //   false
  // ),
  // native_or_introduced_or_invasive: new Array(
  //   options.native_or_introduced_or_invasive.length
  // ).fill(false),
  leaf_shape: new Array(options.leaf_shape.length).fill(false),
  spore_shape: new Array(options.spore_shape.length).fill(false),
  spore_location: new Array(options.spore_location.length).fill(false),
  spore_covering: new Array(options.spore_covering.length).fill(false),
  spore_under_leaf: new Array(options.spore_under_leaf.length).fill(false),
  stems: new Array(options.stems.length).fill(false),
  growth_form: new Array(options.growth_form.length).fill(false),
  petal_symmetry: new Array(options.petal_symmetry.length).fill(false),
  inflorescence: new Array(options.inflorescence.length).fill(false),
  fruit_type: new Array(options.fruit_type.length).fill(false),
  fruit_color: new Array(options.fruit_color.length).fill(false), 
  selectorFilter: "none",
  activeFilterList: [],
  activeFilter: false,
}

export const selectorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_PLANT_TYPE:
      return {
        ...state,
        plant_type: action.payload,
      }
    case types.TOGGLE_TYPE:
      return {
        ...state,
        type: action.payload,
      }
    case types.TOGGLE_HABITAT:
      return {
        ...state,
        habitat: action.payload,
      }
    case types.TOGGLE_FLOWER_PETAL_COLOR:
      return {
        ...state,
        flower_colour: action.payload,
      }
    case types.TOGGLE_LIP_SHAPE:
      return {
        ...state,
        lip_shape: action.payload,
      }
    case types.TOGGLE_LEAF_BLADE_EDGES:
      return {
        ...state,
        leaf_blade_edges: action.payload,
      }
    case types.TOGGLE_LEAF_TYPE:
      return {
        ...state,
        leaf_type: action.payload,
      }
    case types.TOGGLE_LEAF_ARRANGEMENT:
      return {
        ...state,
        leaf_arrangement: action.payload,
      }
    case types.TOGGLE_LEAF_DURATION:
      return {
        ...state,
        leaf_duration: action.payload,
      }
    case types.TOGGLE_LEAFLET_DIVISIONS:
      return {
        ...state,
        leaflet_divisions: action.payload,
      }
    case types.TOGGLE_SPORE_SHAPE:
      return {
        ...state,
        spore_shape: action.payload,
      }
    case types.TOGGLE_SPORE_LOCATION:
      return {
        ...state,
        spore_location: action.payload,
      }
    case types.TOGGLE_SPORE_COVERING:
      return {
        ...state,
        spore_covering: action.payload,
      }
    case types.TOGGLE_SPORE_UNDER_LEAF:
      return {
        ...state,
        spore_under_leaf: action.payload,
      }
    // case types.TOGGLE_COUNTY:
    //   return {
    //     ...state,
    //     new_brunswick_county: action.payload,
    //   }
    case types.TOGGLE_INFLORESCENCE:
      return {
        ...state,
        inflorescence: action.payload,
      }
    // case types.TOGGLE_NATIVE:
    //   return {
    //     ...state,
    //     native_or_introduced_or_invasive: action.payload,
    //   }
    case types.TOGGLE_STEMS:
      return {
        ...state,
        stems: action.payload,
      }
      case types.TOGGLE_GROWTH_FORM:
        return {
          ...state,
          growth_form: action.payload,
        }
    case types.TOGGLE_SHAPE:
      return {
        ...state,
        leaf_shape: action.payload,
      }
    case types.TOGGLE_FRUITS:
      return {
        ...state,
        fruit_type: action.payload,
      }
      case types.TOGGLE_FRUIT_COLOR:
        return {
          ...state,
          fruit_color: action.payload,
        }
    case types.TOGGLE_PETAL_SYMMETRY:
      return {
        ...state,
        petal_symmetry: action.payload,
      }
    case types.ACTIVE_SELECTOR_LIST:
      return {
        ...state,
        activeFilterList: action.payload,
      }
    case types.SELECTOR_FILTER:
      return {
        ...state,
        selectorFilter: action.payload,
      }

    default:
      return state
  }
}