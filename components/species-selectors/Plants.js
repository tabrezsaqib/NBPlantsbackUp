import { useState, useEffect, useRef } from "react"
import { connect, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import ReactPaginate from "react-paginate"
import * as localStore from "../../generics/localStore"
import {
  fetchAllPlantPosts,
  fetchNonWoodyPlantPosts,
  fetchWoodyPlantPosts,
  fetchFernPosts,
  fetchGrassLikePosts,
  getAllPlantsCount,
  getAllNonWoodyPlantsCount,
  getAllWoodyPlantsCount,
  getPopoverData,
} from "../../redux/actions/getPlantsAction"
import {
  setItemOffset,
  setPageCount,
} from "../../redux/actions/paginationAction"
import { resetPageCount } from "../../redux/actions/paginationAction"
import ListPlantSpecies from "../main/ListPlantSpecies"
import SideNav from "../side-nav/SideNav"
import * as options from "../../data/sideNavListDataArray"
import styles from "../../styles/Global.module.scss"
import localstyles from "../../styles/Plants.module.css"
import { array } from "yup"

const Plants = ({
  all_plants,
  nonwoody_plants,
  woody_plants,
  ferns,
  grass_like_plants,
  isLoading,
  itemsPerPage,
  activeFilterList,
  plant_type,
  allType,
  itemOffset,
  pageCount,
  toggle_pagination,
  // all_plants_count,
  // woody_plants_count,
  // nonwoody_plants_count,
  resetCount,
}) => {
  const dispatch = useDispatch()

  const [sidebarVisibility, setSidebarVisibility] = useState(false)

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([])
  const [currentPage, setCurrentPage] = useState(false)

  const [currentPageNumber, setCurrentPageNumber] = useState(0)

  const router = useRouter()
  let filteredList = useRef(new Array())
  let currentSelectedPage = useRef(0)

  //Sidebar Selector filtering
  const filterPlantsTypeData = (plant_data) => {
    filteredList.current = plant_data
    try {
      if (activeFilterList.length === 0) {
        return (filteredList.current = plant_data) 
      } else {
        let filter = {}
        Object.entries(allType).map((item) => {
          if (Array.isArray(item[1])) {
            if (item[1].includes(true)) {
              filter[item[0]] = []
              return item[1].map((data, index) => { if (data === true) filter[item[0]].push(options[item[0]][index]) })
            }
          }
          return
        })
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
        for (let i = 0; i < Object.keys(filter).length; i++) {
          let element = Object.keys(filter)[i];
          const filteredPlants = filteredList.current.filter((item) => {
            if (element == "plant_type" || element == "type") {
              return filter[element].some(ai => item.acf[element].includes(ai));
            }
            // console.log(filterWithSelector)
            return filter[element].some(ai => item.acf.characteristics[element].includes(ai));
          })
          filteredList.current = filteredPlants
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const paginationEngine = () => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(filteredList.current.slice(itemOffset, endOffset))
    dispatch(
      setPageCount(Math.ceil(filteredList.current.length / itemsPerPage))
    )
    const newOffset =
      (resetCount == true
        ? 0
        : currentPage == true && currentSelectedPage.current * itemsPerPage) %
      filteredList.current.length

    dispatch(setItemOffset(newOffset))
  }

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    })
    setCurrentPage(true)
    dispatch(resetPageCount(false))
    currentSelectedPage.current = event.selected
    localStore.setCurrentPage(event.selected)
    const newOffset =
      (event.selected * itemsPerPage) % filteredList.current.length
    dispatch(setItemOffset(newOffset))
  }

  useEffect(() => {
    if (router.query.type == "all") {
      dispatch(fetchAllPlantPosts(router.query.type))

      filterPlantsTypeData(all_plants)
      paginationEngine()
      let localStoreValue = localStore.getCurrentPage()
      localStoreValue && setCurrentPageNumber(localStore.getCurrentPage())
      const newOffset =
        (resetCount == true ? 0 : currentPageNumber * itemsPerPage) %
        filteredList.current.length
      dispatch(setItemOffset(newOffset))
    }
    if (router.query.type == "Woody") {
      dispatch(fetchWoodyPlantPosts(router.query.type))
      filterPlantsTypeData(woody_plants)
      paginationEngine()
      let localStoreValue = localStore.getCurrentPage()
      localStoreValue && setCurrentPageNumber(localStore.getCurrentPage())
      const newOffset =
        (resetCount == true ? 0 : currentPageNumber * itemsPerPage) %
        filteredList.current.length
      dispatch(setItemOffset(newOffset))
    }

    if (router.query.type == "Non-woody") {
      dispatch(fetchNonWoodyPlantPosts(router.query.type))
      filterPlantsTypeData(nonwoody_plants)
      paginationEngine()
      let localStoreValue = localStore.getCurrentPage()
      localStoreValue && setCurrentPageNumber(localStore.getCurrentPage())

      const newOffset =
        (resetCount == true ? 0 : currentPageNumber * itemsPerPage) %
        filteredList.current.length
      dispatch(setItemOffset(newOffset))
    }

    if (router.query.type == "Fern") {
      dispatch(fetchFernPosts(router.query.type))
      filterPlantsTypeData(ferns)
      paginationEngine()
      let localStoreValue = localStore.getCurrentPage()
      localStoreValue && setCurrentPageNumber(localStore.getCurrentPage())

      const newOffset =
        (resetCount == true ? 0 : currentPageNumber * itemsPerPage) %
        filteredList.current.length
      dispatch(setItemOffset(newOffset))
    }
  }, [
    dispatch,
    itemOffset,
    itemsPerPage,
    isLoading,
    router,
    activeFilterList,
    plant_type,
    allType,
    localStore,
    currentPageNumber,
    currentPage,
    // pageClick,
    // all_plants_count,
    // woody_plants_count,
    // nonwoody_plants_count,
    resetCount,
  ])

  const toggleSidebarVisibility = () => {
    setSidebarVisibility(!sidebarVisibility)
  }

  const dropDownValues = [20, 50, 100]

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value)
    itemsPerPage = newItemsPerPage
    paginationEngine(itemsPerPage)
  }

  return (
    <div className="row">
      <div className="col-lg-3 col-sm-12">
        <div className={styles.sidebar_view_media}>
          <a
            className="d-flex back-arrow"
            onClick={() => toggleSidebarVisibility()}>
            <h4>
              <i
                className={
                  !sidebarVisibility
                    ? "bi bi-toggle-off align-self-center"
                    : "bi bi-toggle-on"
                }></i>
              <span>&nbsp;View Filters</span>
            </h4>
          </a>
          <div className={!sidebarVisibility && styles.toggle_sidebar_view}>
            <SideNav />
          </div>
        </div>
      </div>
      <div
        className={
          filteredList.current.length == 0
            ? [styles.error_bg_media_query, localstyles.errorBg, "col-lg-9"].join(" ")
            : "col-lg-9 col-sm-12"
        }>
        {/* <h4>Non Woody Plants..</h4> */}
        <div className="grid-container">
          <ListPlantSpecies filteredList={currentItems} isLoading={isLoading} />
          {isLoading === true ? ""
            :
            <div
            // className="d-flex flex-row justify-content-center align-items-center align-self-center"
            >
              <span className={localstyles.itemsLabel}>Species Per Page:</span>
              <select
                className={localstyles.displayDropdown}
                onChange={handleItemsPerPageChange}>
                {dropDownValues.map((option, index) => (
                  <option className={localstyles.optionContent} key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          }
          <ReactPaginate
            className={toggle_pagination === true ? localstyles.hide : ""}
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            forcePage={resetCount == true ? 0 : currentPageNumber - 0}
            // forcePage={currentPageNumber - 0}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
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
    itemOffset: state.pagination.itemOffset,
    pageCount: state.pagination.pageCount,
    toggle_pagination: state.pagination.toggle_pagination,
    // all_plants_count: state.post.all_plants_count,
    // nonwoody_plants_count: state.post.nonwoody_plants_count,
    // woody_plants_count: state.post.woody_plants_count,
    resetCount: state.pagination.resetCount,
    popoverData: state.post.popoverData,
  }
}

export default connect(mapStateToProps)(Plants)