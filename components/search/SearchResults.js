/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import ReactPaginate from "react-paginate"
import { useEffect, useState } from "react"
import { connect, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { searchByKeyword, setSearchPagination  } from "../../redux/actions/getPlantsAction"
import SearchItem from "./SearchItem"
import SearchFormValidate from "./SearchFormValidate"
import * as localStore from "../../generics/localStore"
import styles from "../../styles/SearchResults.module.css"
import TablePagination from '@mui/material/TablePagination';
import BrokenPageAlert from "../../generics/brokenPageAlert";
import Router from "next/router"

const SearchResults = ({ search_results, searchError, searchPagination }) => {

  const [hasSearchKeyword, setHasSearchKeyWord] = useState(false)
  const [isLoading, setLoading] = useState(true)
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setSearchPagination(parseInt(event.target.value, 10)))
    setPage(0);
  };

  useEffect(() => {
    setRowsPerPage(searchPagination)
  }, [searchPagination])


  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
      if (!router.isReady) return
      if (router.query.keyword) {
        setHasSearchKeyWord(true)
        await dispatch(searchByKeyword(router.query.keyword))
        setLoading(false)
      }
    }
    fetch();
  }, [
    dispatch,
    router,
    router.isReady,
    router.query.keyword
  ])

  useEffect(() => {
    if (search_results.length === 1) {
      Router.push({
        pathname: `/plants/${search_results[0].slug}`,
        query: { type: search_results[0].acf.plant_type },
      }).then(() => {
      })
    }
    else if (search_results.length > 0) {
      setCurrentItems(search_results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
    } else {
      setCurrentItems([])
    }
  }, [page, rowsPerPage, search_results])

  const submitSearchQuery = (value) => {
    dispatch(searchByKeyword(value))
    // dispatch(fetchPlantPost)
  }


  return (
    <>{searchError? <div style={{margin: '5% 0 20% 0', padding:'0 5%'}}> <BrokenPageAlert /> </div> : <>
      <div>
        <span className="breadcrumb">
          {hasSearchKeyword && search_results.length > 0 && `${search_results.length} results found for ${router.query.keyword}`}
        </span>
        {isLoading ? (
          <div className="d-flex flex-wrap justify-content-center" >
            <div className={[styles.imgContainer, "d-flex", "align-items-center", "img-container"].join(" ")}>
              <img className={styles.imgContent} src="../../images/loading.gif" alt="loader" />
            </div>
          </div>
        ) : hasSearchKeyword == true ? (currentItems.length > 0 ? (
          <div className=" d-flex flex-wrap ">
            {currentItems.map((plant, index) => (
              <div key={index}>
                <Link legacyBehavior
                  href={{
                    pathname: `/plants/${plant.slug}`,
                    query: { type: plant.acf.plant_type },
                  }}>
                  <a>
                    <SearchItem plant={plant} />
                  </a>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-column d-flex align-items-center justify-content-center">
            <h2>Sorry! No Results Found</h2>
            <div className="site-in-progress">
                            Site in progress. Not all species are available yet.
            </div>
            <img
              src="../../images/data_not_found.png"
              width="30%"
              alt="data not found"
            />
          </div>
        )
        ) : (
          <div>
            <div className={[styles.searchArea, "search-area", "flex-column", "d-flex", "align-items-center", "justify-content-center"].join(" ")}>
              <h2>Search by keyword</h2>
              <SearchFormValidate
                submitSearchQuery={submitSearchQuery}
                search_bar={true}
              // fetchPlantPosts={fetchPlantPost}
              />
            </div>
          </div>
        )}
      </div>

      {search_results.length > 0 && <div className="d-flex">
        <TablePagination
          component="div"
          count={search_results.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          showFirstButton
          showLastButton
          labelRowsPerPage="Species Per Page:"
          rowsPerPageOptions={[20, 50, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ padding: 0 }}
        /></div>}
    </>}</>
  )
}

const mapStateToProps = (state) => {
  return {
    search_results: state.post.search_results,
    searchError: state.post.searchError,
    searchPagination: state.post.searchPagination
  }
}
export default connect(mapStateToProps)(SearchResults)