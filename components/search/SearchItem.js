/* eslint-disable @next/next/no-img-element */
import React from "react"
import * as api from "../../generics/api"
import styles from "../../styles/SearchItem.module.css"

const SearchItem = ({ plant }) => {
  return (
    <>{plant.acf.common_name &&
      <div className={[styles.contentBox, "content-box"].join(" ")}>
        <div className={[styles.imgContainer, "img-container"].join(" ")}>
          <img
            className={styles.imgContent}
            src={
              plant.acf.image_url !== undefined && plant.acf.gallery_view_image
                ? plant.acf.gallery_view_image.sizes.medium
                : "../images/no_result_found.png"
            }
            alt=""
          />
        </div>
        <div className="description">
          <h4 className={[styles.heading, "heading mt-3"].join(" ")}>{plant.title.rendered}</h4>
          <div className="d-flex flex-column">
            <span>
              <strong>Common name:</strong> {plant.acf.common_name}
            </span>
            <div className={["d-flex", "flex-wrap", styles.tags, "tags"].join(" ")}>
            {plant.acf.characteristics === ''? <>{
              plant.acf.characteristics.habitat.map((val, index) => (
                <span className={styles.spanContent} key={index}>
                  {api.capitalizeFirstLetter(val)}, &nbsp;
                </span>
              ))}
              {plant.acf.characteristics.leaf_type.map((val, index) => (
                <span className={styles.spanContent} key={index}>
                  {api.capitalizeFirstLetter(val)}, &nbsp;
                </span>
              ))}
              {plant.acf.characteristics.leaf_arrangement.map((val, index) => (
                <span className={styles.spanContent} key={index}>
                  {api.capitalizeFirstLetter(val)}, &nbsp;
                </span>
              ))}
              {plant.acf.characteristics.leaf_blade_edges.map((val, index) => (
                <span className={styles.spanContent} key={index}>
                  {api.capitalizeFirstLetter(val)}, &nbsp;
                </span>
              ))}
              {plant.acf.characteristics.flower_colour.map((val, index) => (
                <span className={styles.spanContent} key={index}>
                  {api.capitalizeFirstLetter(val)}, &nbsp;
                  {val !==
                  plant.acf.characteristics.flower_colour.slice(-1).pop()
                    ? ","
                    : ""}
                  &nbsp;
                </span>
              ))}</>:''}
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default SearchItem