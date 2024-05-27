import { useState, useEffect, useCallback } from "react"
import { connect, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { fetchNonWoodyPlantPosts, fetchWoodyPlantPosts, fetchFernPosts, fetchAllPlantPosts, setLoader } from "../../redux/actions/getPlantsAction"
import TablePagination from '@mui/material/TablePagination';
import BrokenPageAlert from "../../generics/brokenPageAlert";
import ListPlantSpecies from "../main/ListPlantSpecies"
import SideNav from "../side-nav/SideNav"
import * as options from "../../data/sideNavListDataArray"
import styles from "../../styles/Global.module.scss"
import localstyles from "../../styles/Plants.module.css"

const Plants = ({ all_plants, nonwoody_plants, woody_plants, ferns, isLoading, activeFilterList, allType, plantsError }) => {

  const dispatch = useDispatch()

  const [sidebarVisibility, setSidebarVisibility] = useState(false)
  const [filteredList, setFilteredList] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const router = useRouter()

  const filterPlantsTypeData = useCallback((plant_data) => {
    setPage(0);
    setFilteredList(plant_data)
    try {
      if (activeFilterList.length !== 0) {
        let filter = {}
        const filterWithSelector = {}

        activeFilterList.map((element) => {
          const listOfSelector = Object.keys(options);
          for (let i = 0; i < listOfSelector.length; i++) {
            if (options[listOfSelector[i]].includes(element)) {
              let type = listOfSelector[i]
              if (filterWithSelector[type]) filterWithSelector[type].push(element)
              else filterWithSelector[type] = [element]
            }
          }
        })

        Object.entries(allType).map((item) => {
          if (Array.isArray(item[1])) {
            if (item[1].includes(true)) {
              filter[item[0]] = []
              return item[1].map((data, index) => { if (data === true) filter[item[0]].push(options[item[0]][index]) })
            }
          }
          return
        })

        let filteredPlants = []
        for (let i = 0; i < Object.keys(filter).length; i++) {
          let element = Object.keys(filter)[i];
          let data = i === 0 ? plant_data : filteredPlants
          filteredPlants = data.filter((plant) => {
            if (element == "plant_type" || element == "type") {
              return filter[element].some(ai => plant.acf[element].includes(ai));
            }
            return filter[element].some(ai => plant.acf.characteristics[element].includes(ai));
          })
        }
          setFilteredList(filteredPlants)
        } else {
        return filteredList
      }
    } catch (error) {
      console.log(error.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilterList])



  useEffect(() => {
    async function fetch() {
      if (router.query.type == "all") {
        console.log("all")
        if (all_plants.length === 0) {
          await dispatch(setLoader())
          await dispatch(fetchAllPlantPosts(router.query.type))
        } else {
          filterPlantsTypeData(all_plants)
        }
      }
      else if (router.query.type == "Woody") {
        if (woody_plants.length === 0) {
          await dispatch(setLoader())
          await dispatch(fetchWoodyPlantPosts(router.query.type))
        } else {
          console.log("Woody", woody_plants)
          await filterPlantsTypeData(woody_plants)
        }

      }
      else if (router.query.type == "Non-woody") {
        if (nonwoody_plants.length == 0) {
          await dispatch(setLoader())
          await dispatch(fetchNonWoodyPlantPosts(router.query.type))
        } else {
          await filterPlantsTypeData(nonwoody_plants)
        }
      }
      else if (router.query.type == "Fern") {
        if (ferns.length === 0) {
          await dispatch(setLoader())
          await dispatch(fetchFernPosts(router.query.type))
        } else {
          filterPlantsTypeData(ferns)
        }
      }
    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allType, woody_plants, ferns, all_plants, nonwoody_plants, router, activeFilterList])

  const toggleSidebarVisibility = () => {
    setSidebarVisibility(!sidebarVisibility)
  }

  return (
    <div className="row">
      {plantsError ?<div style={{margin: '5% 0 20% 0', padding:'0 5%'}}> <BrokenPageAlert /> </div>:
      <>
        <div className="col-lg-3 col-sm-12">
          <div className={styles.sidebar_view_media}>
            <a
              className="d-flex back-arrow"
              onClick={() => toggleSidebarVisibility()}>
              <h4> <i className={!sidebarVisibility ? "bi bi-toggle-off align-self-center" : "bi bi-toggle-on"}></i>
                <span>&nbsp;View Filters</span>
              </h4>
            </a>
            <div className={!sidebarVisibility && styles.toggle_sidebar_view}>
              <SideNav />
            </div>
          </div>
        </div>
        <div
          className={filteredList.length == 0 ? [styles.error_bg_media_query, localstyles.errorBg, "col-lg-9"].join(" ") : "col-lg-9 col-sm-12"}>
          {/* <h4>Non Woody Plants..</h4> */}
          <div className="grid-container">
            <ListPlantSpecies filteredList={filteredList} pg={page} rpg={rowsPerPage} isLoading={isLoading} />
            {filteredList.length > 0 && <div style={{ float: 'left' }}>
              <TablePagination
                component="div"
                count={filteredList.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                showFirstButton
                showLastButton
                labelRowsPerPage="Species Per Page:"
                rowsPerPageOptions={[20, 50, 100]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>}
          </div>
        </div></>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    all_plants: state.post.all_plants,
    woody_plants: state.post.woody_plants,
    nonwoody_plants: state.post.nonwoody_plants,
    ferns: state.post.ferns,
    grass_like_plants: state.post.grass_like_plants,
    isLoading: state.post.isLoading,
    activeFilterList: state.selector.activeFilterList,
    allType: state.selector,
    plant_type: state.selector.plant_type,
    plantsError: state.post.plantsError
  }
}

export default connect(mapStateToProps)(Plants)