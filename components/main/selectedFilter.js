/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable import/namespace */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';
import { activeFilterData } from '../../redux/actions/selectorFilterAction';
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
import * as options from "../../data/sideNavListDataArray"
import { Button } from '@mui/material';
import PlantListModal from './plantListModal';

export default function SelectedFilter() {
    const { activeFilterList, plant_type, type, habitat,
        flower_colour, lip_shape, leaf_blade_edges, leaf_type, leaf_duration,
        leaflet_divisions, leaf_arrangement, leaf_shape, spore_shape,
        spore_location, spore_covering, spore_under_leaf, stems, growth_form, petal_symmetry,
        inflorescence, fruit_type, fruit_color } = useSelector(state => state.selector);
    const allType = useSelector(state => state.selector);
    const [openModal, setOpenModal] = React.useState(false);
    const { filteredPlantList } = useSelector(state => state.post)
    const dispatch = useDispatch();

    const [listOfSelector, setListOfSelector] = React.useState({})
    const handleClearAll = () => {
        dispatch(togglePlantTypeData(new Array(options.plant_type.length).fill(false)))
        dispatch(toggleTypeData(new Array(options.type.length).fill(false)))
        dispatch(toggleFlowerPetalColorData(new Array(options.flower_colour.length).fill(false)))
        dispatch(toggleFruitColor(new Array(options.fruit_color.length).fill(false)))
        dispatch(toggleFruits(new Array(options.fruit_type.length).fill(false)))
        dispatch(toggleGrowthForm(new Array(options.growth_form.length).fill(false)))
        dispatch(toggleHabitatData(new Array(options.habitat.length).fill(false)))
        dispatch(toggleInflorescence(new Array(options.inflorescence.length).fill(false)))
        dispatch(toggleLeafArrangementData(new Array(options.leaf_arrangement.length).fill(false)))
        dispatch(toggleLeafBladeEdgesData(new Array(options.leaf_blade_edges.length).fill(false)))
        dispatch(toggleLeafDuration(new Array(options.leaf_duration.length).fill(false)))
        dispatch(toggleLeafShapeData(new Array(options.leaf_shape.length).fill(false)))
        dispatch(toggleLeafTypeData(new Array(options.leaf_type.length).fill(false)))
        dispatch(toggleLeafletDivisions(new Array(options.leaflet_divisions.length).fill(false)))
        dispatch(toggleLipShape(new Array(options.lip_shape.length).fill(false)))
        // dispatch(toggleNative(new Array(options.native_or_introduced_or_invasive.length).fill(false)))
        dispatch(togglePetalSymmetry(new Array(options.petal_symmetry.length).fill(false)))
        dispatch(toggleSporeCovering(new Array(options.spore_covering.length).fill(false)))
        dispatch(toggleSporeLocation(new Array(options.spore_location.length).fill(false)))
        dispatch(toggleSporeShape(new Array(options.spore_shape.length).fill(false)))
        dispatch(toggleSporeUnderLeaf(new Array(options.spore_under_leaf.length).fill(false)))
        dispatch(toggleStemsData(new Array(options.stems.length).fill(false)))
        dispatch(activeFilterData([]))
    };
    React.useEffect(() => () => {
        handleClearAll()
    }, []);

    React.useEffect(() => {
        const filter = []
        Object.entries(allType).map((item) => {
            if (Array.isArray(item[1])) {
                if (item[1].includes(true)) {
                    filter[item[0]] = []
                    return item[1].map((data, index) => { if (data === true) filter[item[0]].push({ name: options[item[0]][index], indexx: index }) })
                }
            }

        })
        setListOfSelector(filter)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilterList])

    const handleDelete = (e, option) => {
        console.log(option)
        let splitStr = option.split("$$")
        handleOnChange(parseInt(splitStr[2], 10), splitStr[0])
        const filterIndex = activeFilterList.indexOf(splitStr[1])
        const newFilter = [...activeFilterList]
        newFilter.splice(filterIndex, 1)
        dispatch(activeFilterData(newFilter))
    };


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
                console.log(habitat)
                const updatedHabitat = habitat.map((item, index) =>
                    index === position ? !item : item
                )
                console.log(updatedHabitat)
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
            case "leaf_type":
                const updatedLeafType = leaf_type.map(
                    (item, index) => (index === position ? !item : item) //if index === position then !item i.e. true, otherwise false, since initially item is false...
                )
                dispatch(toggleLeafTypeData(updatedLeafType))
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

    const handleModal=()=>{
        setOpenModal(!openModal)
    }

    return (
        <div style={{ marginLeft: '10px' }}>
            {activeFilterList.length >= 1 &&
            <Stack direction="row" spacing={1} justifyContent="space-between">
                <div style={{ marginBottom: '10px', fontSize:'14px' }}> {activeFilterList.length} item(s) selected.
                    <span className='linklike' onClick={handleClearAll} ><b>Clear All</b></span></div>
                    {filteredPlantList.length>0 &&<Button variant="outlined" size='small' sx={{ color: '#0e9d47', borderColor: '#0e9d47', m: '10px' }} onClick={handleModal}><b>Plants List</b></Button>}
            </Stack>}
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                {Object.keys(listOfSelector).map((option) => (
                    listOfSelector[option].map((name) => (
                        <Chip label={name.name} key={`${option}_${name.name}_${name.index}`} sx={{ textTransform: 'capitalize', mb: '7px' }}
                            variant="outlined" onDelete={(e) => handleDelete(e, `${option}$$${name.name}$$${name.indexx}`)} />
                    ))))}
            </Stack>
            {openModal && <PlantListModal openModal={openModal} handleModal={handleModal}/>}
            <style jsx>
                {`.linklike{
                        text-decoration: underline;
                        color:  #198754;
                        cursor: pointer;
                        margin-left: 5px;
                }
                .MuiStack-root {
                    margin-bottom: 7px!important;
                }`}
            </style>
        </div>
    );
}