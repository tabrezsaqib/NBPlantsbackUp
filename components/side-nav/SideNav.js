import { useState, useEffect } from "react"
import dynamic from 'next/dynamic'

import { connect, useDispatch } from "react-redux"
import * as options from "../../data/sideNavListDataArray"
import * as localStore from "../../generics/localStore"
const SideNavContent = dynamic(
  () => import('./SideNavContent'),
  { ssr: false }
)
import styles from "../../styles/SideNav.module.css"

import {
  togglePlantTypeData,
  toggleTypeData,
  toggleHabitatData,
  toggleFlowerPetalColorData,
  toggleLeafBladeEdgesData,
  toggleLeafTypeData,
  toggleLeafArrangementData,
  toggleLipShape,
  toggleFruits,
  toggleFruitColor,
  toggleInflorescence,
  toggleLeafShapeData,
  toggleNative,
  toggleStemsData,
  toggleGrowthForm,
  togglePetalSymmetry,
  toggleLeafDuration,
  toggleLeafletDivisions,
  toggleSporeShape,
  toggleSporeLocation,
  toggleSporeCovering,
  toggleSporeUnderLeaf
} from "../../redux/actions/toggleSelectorAction"
import {
  getPopoverData,
  triggerToolTip,
} from "../../redux/actions/getPlantsAction"
import {
  selectorFilterData,
  activeFilterData,
} from "../../redux/actions/selectorFilterAction"
import { resetPageCount } from "../../redux/actions/paginationAction"
const SideNav = ({
  plant_type,
  type,
  habitat,
  flower_colour,
  lip_shape,
  fruit_type,
  fruit_color,
  leaf_blade_edges,
  leaf_type,
  leaf_arrangement,
  leaf_duration,
  leaflet_divisions,
  spore_shape,
  spore_location,
  spore_covering,
  spore_under_leaf,
  new_brunswick_county,
  activeFilterList,
  // native_or_introduced_or_invasive,
  leaf_shape,
  stems,
  growth_form,
  petal_symmetry,
  inflorescence,
  isLoading,
  popoverData,
  popoverStatus,
}) => {
  const dispatch = useDispatch()
  const [activeFilter, setActiveFilter] = useState()

  useEffect(() => {
    setActiveFilter(localStore.getActiveFilter())
  }, [activeFilter])

  const handleOnChange = (position, option) => {
    switch (option) {
      case "plant_type":
        const updatedPlantType = plant_type.map((item, index) =>
          index === position ? !item : item
        )
        // dispatch(dispatch({ type: "TOGGLE_HABITAT", payload: updatedHabitat }))
        dispatch(togglePlantTypeData(updatedPlantType))
        break
      case "type":
        const updatedType = type.map((item, index) =>
          index === position ? !item : item
        )
        // dispatch(dispatch({ type: "TOGGLE_HABITAT", payload: updatedHabitat }))
        dispatch(toggleTypeData(updatedType))
        break
      case "habitat":
        const updatedHabitat = habitat.map((item, index) =>
          index === position ? !item : item
        )
        // dispatch(dispatch({ type: "TOGGLE_HABITAT", payload: updatedHabitat }))
        dispatch(toggleHabitatData(updatedHabitat))
        break
      case "flower_colour":
        const updatedFlowerPetalColor = flower_colour.map((item, index) =>
          index === position ? !item : item
        )
        dispatch(toggleFlowerPetalColorData(updatedFlowerPetalColor))
        break
      case "lip_shape":
        const updatedLipShape = lip_shape.map((item, index) =>
          index === position ? !item : item
        )
        dispatch(toggleLipShape(updatedLipShape))
        break

      case "fruit_type":
        const updatedFruits = fruit_type.map((item, index) =>
          index === position ? !item : item
        )
        dispatch(toggleFruits(updatedFruits))
        break
      case "fruit_color":
        const updatedFruitColor = fruit_color.map((item, index) =>
          index === position ? !item : item
        )
        dispatch(toggleFruitColor(updatedFruitColor))
        break
      case "leaf_type":
        const updatedLeafType = leaf_type.map(
          (item, index) => (index === position ? !item : item) //if index === position then !item i.e. true, otherwise false, since initially item is false...
        )
        dispatch(toggleLeafTypeData(updatedLeafType))
        break
      case "leaf_arrangement":
        const updatedLeafArrangement = leaf_arrangement.map((item, index) =>
          index === position ? !item : item
        )
        dispatch(toggleLeafArrangementData(updatedLeafArrangement))
        break
      case "leaf_blade_edges":
        const updatedLeafBladeEdges = leaf_blade_edges.map((item, index) =>
          index === position ? !item : item
        )
        dispatch(toggleLeafBladeEdgesData(updatedLeafBladeEdges))
        break
      case "leaf_shape":
        const updatedLeafShape = leaf_shape.map((item, index) =>
          index === position ? !item : item
        )
        dispatch(toggleLeafShapeData(updatedLeafShape))
        break

      case "leaf_duration":
        const updatedLeafDuration = leaf_duration.map(
          (item, index) => (index === position ? !item : item) //if index === position then !item i.e. true, otherwise false, since initially item is false...
        )
        dispatch(toggleLeafDuration(updatedLeafDuration))
        break
      case "leaflet_divisions":
        const updatedLeafletDivisions = leaflet_divisions.map(
          (item, index) => (index === position ? !item : item) //if index === position then !item i.e. true, otherwise false, since initially item is false...
        )
        dispatch(toggleLeafletDivisions(updatedLeafletDivisions))
        break
      case "spore_shape":
        const updatedSporeShape = spore_shape.map(
          (item, index) => (index === position ? !item : item) //if index === position then !item i.e. true, otherwise false, since initially item is false...
        )
        dispatch(toggleSporeShape(updatedSporeShape))
        break
      case "spore_location":
        const updatedSporeLocation = spore_location.map(
          (item, index) => (index === position ? !item : item) //if index === position then !item i.e. true, otherwise false, since initially item is false...
        )
        dispatch(toggleSporeLocation(updatedSporeLocation))
        break
      case "spore_covering":
        const updatedSporeCovering = spore_covering.map(
          (item, index) => (index === position ? !item : item) //if index === position then !item i.e. true, otherwise false, since initially item is false...
        )
        dispatch(toggleSporeCovering(updatedSporeCovering))
        break
      case "spore_under_leaf":
        const updatedSporeUnderLeaf = spore_under_leaf.map(
          (item, index) => (index === position ? !item : item) //if index === position then !item i.e. true, otherwise false, since initially item is false...
        )
        dispatch(toggleSporeUnderLeaf(updatedSporeUnderLeaf))
        break
      // case "new_brunswick_county":
      //   const updatedCounty = new_brunswick_county.map((item, index) =>
      //     index === position ? !item : item
      //   )
      //   dispatch(toggleCountyData(updatedCounty))
      //   break

      case "stems":
        const updatedStems = stems.map((item, index) =>
          index === position ? !item : item
        )
        dispatch(toggleStemsData(updatedStems))
        break
      case "growth_form":
        const updatedGrowthForm = growth_form.map((item, index) =>
          index === position ? !item : item
        )
        dispatch(toggleGrowthForm(updatedGrowthForm))
        break
      case "native_or_introduced_or_invasive":
        const updatedNative = native_or_introduced_or_invasive.map(
          (item, index) => (index === position ? !item : item)
        )
        dispatch(toggleNative(updatedNative))
        break
      case "petal_symmetry":
        const updatedPetalSymmetry = petal_symmetry.map((item, index) =>
          index === position ? !item : item
        )
        dispatch(togglePetalSymmetry(updatedPetalSymmetry))
        break
      case "inflorescence":
        const updatedInflorescence = inflorescence.map((item, index) =>
          index === position ? !item : item
        )
        dispatch(toggleInflorescence(updatedInflorescence))
        break
      default:
        break
    }
  }

  const onSelectorChange = (filter) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    })
    
    if (activeFilterList.includes(filter)) {
      const filterIndex = activeFilterList.indexOf(filter)
      const newFilter = [...activeFilterList]
      newFilter.splice(filterIndex, 1) //Remove one element from the newFilter i.e array.splice(index, how many items)
      dispatch(selectorFilterData(filter))
      dispatch(activeFilterData(newFilter))
      dispatch(resetPageCount(true))
    } else {
      dispatch(selectorFilterData(filter))
      dispatch(activeFilterData([...activeFilterList, filter]))
      dispatch(resetPageCount(true))
    }
  }

  return (
    <div className={[styles.sidebar, "sidebar d-flex flex-column justify-content-between"].join(" ")}>
      <div className={isLoading == true ? [styles.disableSidebar, "disable-sidebar"].join(" ") : "options"}>
        <SideNavContent
          options={options}
          plant_type={plant_type}
          type={type}
          habitat={habitat}
          flower_colour={flower_colour}
          lip_shape={lip_shape}
          leaf_blade_edges={leaf_blade_edges}
          fruit_type={fruit_type}
          fruit_color={fruit_color}
          leaf_type={leaf_type}
          leaf_arrangement={leaf_arrangement}
          leaf_duration={leaf_duration}
          leaflet_divisions={leaflet_divisions}
          spore_location={spore_location}
          spore_shape={spore_shape}
          spore_covering={spore_covering}
          spore_under_leaf={spore_under_leaf}
          // new_brunswick_county={new_brunswick_county}
          // native_or_introduced_or_invasive={native_or_introduced_or_invasive}
          leaf_shape={leaf_shape}
          stems={stems}
          growth_form={growth_form}
          petal_symmetry={petal_symmetry}
          inflorescence={inflorescence}
          onSelectorChange={onSelectorChange}
          handleOnChange={handleOnChange}
          popoverData={popoverData}
          getPopoverData={getPopoverData}
          triggerToolTip={triggerToolTip}
          popoverStatus={popoverStatus}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    plant_type: state.selector.plant_type,
    type: state.selector.type,
    habitat: state.selector.habitat,
    flower_colour: state.selector.flower_colour,
    fruit_type: state.selector.fruit_type,
    fruit_color: state.selector.fruit_color,
    lip_shape: state.selector.lip_shape,
    leaf_blade_edges: state.selector.leaf_blade_edges,
    leaf_type: state.selector.leaf_type,
    leaf_arrangement: state.selector.leaf_arrangement,
    leaf_duration: state.selector.leaf_duration,
    leaflet_divisions: state.selector.leaflet_divisions,
    spore_location: state.selector.spore_location,
    spore_shape: state.selector.spore_shape,
    spore_covering: state.selector.spore_covering,
    spore_under_leaf: state.selector.spore_under_leaf,
    // new_brunswick_county: state.selector.new_brunswick_county,
    // native_or_introduced_or_invasive:
    //   state.selector.native_or_introduced_or_invasive,
    leaf_shape: state.selector.leaf_shape,
    stems: state.selector.stems,
    growth_form: state.selector.growth_form,
    petal_symmetry: state.selector.petal_symmetry,
    inflorescence: state.selector.inflorescence,
    activeFilterList: state.selector.activeFilterList,
    isLoading: state.post.isLoading,
    popoverData: state.post.popoverData,
    popoverStatus: state.post.popoverStatus,
  }
}

export default connect(mapStateToProps)(SideNav)