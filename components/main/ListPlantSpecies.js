/* eslint-disable @next/next/no-img-element */
import { connect, useDispatch } from "react-redux"
import { useRouter } from "next/router"
import Link from "next/link"
import PlantSpecies from "./PlantSpecies"
import styles from "../../styles/Global.module.scss"
import loaderStyles from "../../styles/Loader.module.scss"
import LoaderThumbnail from "./LoaderThumbnail"
import SelectedFilter from "./selectedFilter"
import { useEffect, useState } from "react"

const ListPlantSpecies = ({
  activeFilterList,
  isLoading,
  filteredList, pg, rpg
}) => {
  const loaderDataCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const [filteredListSorted, setFilteredListSorted] = useState([])
  useEffect(() => {
    const sorted = [...filteredList].sort((a, b) => {
      if (a.title.rendered && b.title.rendered)
        return a.title.rendered.localeCompare(b.title.rendered)
      else
        return a.title.localeCompare(b.title)
    });
    setFilteredListSorted(sorted)
  }, [filteredList])
  return (
    <div >
      <SelectedFilter />
      <div className="d-flex flex-wrap">
        {filteredListSorted.length > 0 ? (
          ((rpg && pg >= 0) ? filteredListSorted.slice(pg * rpg, pg * rpg + rpg) : filteredListSorted).map((data, index) => {
            return (
              <div
                key={data.id}
                className={[
                  "box-container",
                  styles.box_container_media_query,
                ].join(" ")}>
                <Link legacyBehavior
                  href={{
                    pathname: `/plants/${data.slug}`,
                    query: { type: data.acf.plant_type },
                  }}>
                  <a className="thumbnails">
                    <PlantSpecies plant={data} />
                  </a>
                </Link>
              </div>
            )
          })
        ) : isLoading == true ? (
          <div className="d-flex flex-wrap">
            {loaderDataCount.map((data, index) => (
              <div key={index} className={[loaderStyles.loader_box].join(" ")}>
                <LoaderThumbnail />
              </div>
            ))}
          </div>
        ) : (
          filteredListSorted.length == 0 &&
          activeFilterList.length > 0 && (
            <div className="info-section d-flex align-items-center justify-content-center">
              <div className="d-flex flex-column text-center">
                <img src="../../images/no_result_found.png" alt="" />
                <br></br>
                <br></br>
                <h3>Oops! No data found!</h3>
                <div className="site-in-progress">
                            Site in progress. Not all species are available yet.
                </div>
              </div>
            </div>
          )
        )}</div>
      <style jsx>{`
        .box-container {
          background-color: #ffffff;
          margin: 10px 10px 20px;
          border-radius: 15px;
          border: 1px solid #e0e1e3;
          flex-grow: 1;
          width: 200px;
        }
        .info-section {
          height: 100%;
          width: 100%;
        }
        .img-container {
          img {
            top: 50%;
            left: 58%;
            width: 80px;
          }
        }
        .site-in-progress{
          margin-top: 30px;
          margin-bottom:50px;
          text-align: center;
          font-size: 20px;
        }

        :global(.thumbnails:hover) {
          color: #1d9d47 !important;
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    activeFilterList: state.selector.activeFilterList,
  }
}

export default connect(mapStateToProps)(ListPlantSpecies)