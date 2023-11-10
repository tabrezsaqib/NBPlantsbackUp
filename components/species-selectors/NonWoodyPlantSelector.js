/* eslint-disable @next/next/no-img-element */
import React from "react"
import styles from "../../styles/NonWoodyPlantSelector.module.css"

const NonWoodyPlantSelector = () => {
  return (
    <div className={styles.block}>
      <img className={styles.imgContent} src="../images/non-woody-icon.png" alt="nonwoody plant icon" />
      <h4 className={styles.h4Content}>All Other Plants</h4>
      <p>In progress</p>
    </div>
  )
}

export default NonWoodyPlantSelector