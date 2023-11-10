/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import * as api from "../../generics/api"
import PlantItem from "./PlantItem"

const PlantSpecies = ({ plant }) => {
  // console.log("Plant Species: ", plant)
  const router = useRouter()
  return (
    <>
      {router.pathname == `/plants` && router.query.type == `Non-woody` ? (
        <>
          {/* {console.log("Non Woody: ", plant)} */}
          <PlantItem plant={plant} />
        </>
      ) : router.pathname == `/plants` && router.query.type == `Fern` ? (
        <>
          {/* {console.log("Non Woody: ", plant)} */}
          <PlantItem plant={plant} /> 
        </>
      ) : router.pathname == "/plants" && router.query.type == `Woody` ? (
        <>
          <PlantItem plant={plant} />
        </>
      ) : router.query.type == "all" ? (
        <PlantItem plant={plant} />
      ) : router.pathname.includes("/plantFamilyDetails") ? (
        <PlantItem plant={plant} />
      ) : (
        <div
          className={
            plant.acf.plant_type == "Non-woody" ||
            plant.acf.plant_type == "Woody" ||
            plant.acf.plant_type == "Fern"
              ? "hidden"
              : "content-box"
          }>
          <div className="info-section d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column text-center">
              <img src="../images/no_result_found.png" alt="" />
              <h3>Oops! No data found!</h3>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .content-box {
          width: 220px;
          height: auto;
          overflow: hidden;
          margin-bottom: 40px;
        }

        .img-container {
          overflow: hidden;
          width: 100%;
          height: 230px;
          border: 1px solid #e0e1e3;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .hidden {
          display: none;
        }
      `}</style>
    </>
  )
}

export default PlantSpecies