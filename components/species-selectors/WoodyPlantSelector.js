/* eslint-disable @next/next/no-img-element */
import React from "react"
import styles from "../../styles/WoodyPlantSelector.module.css"

const WoodyPlantSelector = () => {
  return (
    <div className={styles.block}>
      <img className={styles.imgContent} src="../images/woody-plant-icon.png" alt="woody plant icon" />
      <h4 className={styles.h4Content}>Woody Plants</h4>
      <p>In progress</p>
    </div>
  )
}

export default WoodyPlantSelector