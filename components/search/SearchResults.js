/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import ReactPaginate from "react-paginate"
import { useEffect, useState } from "react"
import { connect, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { searchByKeyword } from "../../redux/actions/getPlantsAction"
import SearchItem from "./SearchItem"
import SearchFormValidate from "./SearchFormValidate"
import * as localStore from "../../generics/localStore"
import styles from "../../styles/SearchResults.module.css"

const SearchResults = ({
  search_results,
  search_bar,
  search_bar_active,
  itemsPerPage,
}) => {
  const [hasSearchKeyword, setHasSearchKeyWord] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [currentPageNumber, setCurrentPageNumber] = useState(0)
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!router.isReady) return
    if (router.query.keyword) {
      setLoading(false)
      setHasSearchKeyWord(true)
      dispatch(searchByKeyword(router.query.keyword))
    }

    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage

    if (search_results.length > 0) {
      setCurrentItems(search_results.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(search_results.length / itemsPerPage))
      setLoading(false)

      let localStoreValue = localStore.getCurrentSearchPage()
      localStoreValue && setCurrentPageNumber(localStore.getCurrentSearchPage())
      const newOffset =
        (currentPageNumber * itemsPerPage) % search_results.length
      setItemOffset(newOffset)
    } else {
      setCurrentItems(search_results.message)
      setLoading(false)
    }
  }, [
    dispatch,
    router,
    router.isReady,
    router.query.keyword,
    itemOffset,
    itemsPerPage,
    isLoading,
    pageCount,
    search_results.length,
    hasSearchKeyword,
    currentPageNumber,
  ])

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    localStore.setCurrentSearchPage(event.selected)
    const newOffset = (event.selected * itemsPerPage) % search_results.length
    setItemOffset(newOffset)
  }

  const submitSearchQuery = (value) => {
    dispatch(searchByKeyword(value))
    // dispatch(fetchPlantPost)
  }

  return (
    <>
      <div>
        <span className="breadcrumb">
          {hasSearchKeyword &&
            search_results.length > 0 &&
            `${search_results.length} results found for ${router.query.keyword}`}
        </span>
        <div
          className={
            currentItems == "Nothing found"
              ? "d-flex justify-content-center"
              : ""
          }>
          <div
            className={
              isLoading
                ? "d-flex justify-content-center flex-wrap"
                : router.query.keyword == ""
                  ? ""
                  : currentItems == null
                    ? "d-flex justify-content-center flex-wrap"
                    : "d-flex flex-wrap"
            }>
            {isLoading ? (
              <div className={[styles.imgContainer, "d-flex", "align-items-center", "img-container"].join(" ")}>
                <img className={styles.imgContent} src="../../images/loading.gif" alt="loader" />
              </div>
            ) : hasSearchKeyword == true ? (
              currentItems == null ? (
                <div className={[styles.imgContainer, "d-flex", "align-items-center", "img-container"].join(" ")}>
                  <img className={styles.imgContent} src="../../images/loading.gif" alt="loader" />
                </div>
              ) : currentItems !== "Nothing found" ? (
                currentItems.map((plant, index) => (
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
                ))
              ) : (
                <div className="flex-column d-flex align-items-center justify-content-center">
                  <img
                    src="../../images/data_not_found.png"
                    width="50%"
                    alt="data not found"
                  />
                  <h2>Sorry! No Results Found :(</h2>
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
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            forcePage={currentPageNumber - 0}
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
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    search_results: state.post.search_results,
  }
}
export default connect(mapStateToProps)(SearchResults)