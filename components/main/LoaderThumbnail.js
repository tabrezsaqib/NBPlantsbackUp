import React from "react"
import styles from "../../styles/Loader.module.scss"

const LoaderThumbnail = () => {
  return (
    <div>
      <div className={styles.img_container_loading}></div>
      <div className="description">
        <h4 className={["mt-3", styles.heading_loading].join(" ")}></h4>
        <div className="d-flex flex-column">
          <div
            className={["d-flex flex-wrap", styles.description_loading].join(
              " "
            )}></div>
        </div>
      </div>
    </div>
  )
}

export default LoaderThumbnail