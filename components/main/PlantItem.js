/* eslint-disable @next/next/no-img-element */
import * as api from "../../generics/api"

const PlantItem = ({ plant }) => {
  return (
    <>
      <div
        className={
          (plant.acf.plant_type == "Non-woody" ||
            plant.acf.plant_type == "Woody" ||
            plant.acf.plant_type == "Fern") &&
          "content-box"
        }>
        <div className="img-container">
          <img
            src={
              Object.hasOwn(plant.acf, "image_url") == true
                ? plant.acf.image_url.length > 0
                  ? plant.acf.image_url[0].full_image_url
                  : plant.acf.image_url.full_image_url
                : "../images/no_result_found.png"
            }
            alt=""
          />
        </div>
        <div className="description">
          <h4 className="heading mt-3">{plant.acf.common_name}</h4>
          <div className="d-flex flex-column">
            <span>
              <i>{`${plant.title.rendered ? plant.title.rendered : plant.title}`}</i>
            </span>
            <div className="d-flex flex-wrap tags">
              {plant.acf.characteristics ? <>
                {plant.acf.characteristics.habitat.map((val, index) => (
                  <span key={index}>
                    {api.capitalizeFirstLetter(val)}, &nbsp;
                  </span>
                ))}
                {plant.acf.characteristics.leaf_type.map((val, index) => (
                  <span key={index}>
                    {api.capitalizeFirstLetter(val)}, &nbsp;
                  </span>
                ))}
                {plant.acf.characteristics.leaf_arrangement.map((val, index) => (
                  <span key={index}>
                    {api.capitalizeFirstLetter(val)}, &nbsp;
                  </span>
                ))}
                {plant.acf.characteristics.leaf_blade_edges.map((val, index) => (
                  <span key={index}>
                    {api.capitalizeFirstLetter(val)}, &nbsp;
                  </span>
                ))}
                {plant.acf.characteristics.flower_colour.map((val, index) => (
                  <span key={index}>
                    {api.capitalizeFirstLetter(val)}
                    {val !==
                      plant.acf.characteristics.flower_colour.slice(-1).pop()
                      ? ","
                      : ""}
                    &nbsp;
                  </span>
                ))}</> : ''}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .content-box {
          width: 100%;
          height: auto;
          overflow: hidden;
        }
        .heading {
          font-weight: 900;
        }
        .img-container {
          overflow: hidden;
          width: 100%;
          height: 200px;
          border-top-right-radius: 15px;
          border-top-left-radius: 15px;
          border-bottom: 1px solid #e0e1e3;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .description {
          padding: 5px 15px 15px;
          font-size: 15px;
        }
        .hidden {
          display: none;
        }
        .tags {
          span {
            color: #84878e;
            font-size: 12.5px;
          }
        }
      `}</style>
    </>
  )
}

export default PlantItem