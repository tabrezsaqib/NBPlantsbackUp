/* eslint-disable @next/next/no-img-element */
import React from "react"
import styles from "../../styles/GrassLike.module.css"

const GrassLike = () => {
  return (
    <div className={styles.block}>
      <img className={styles.imgContent} src="../images/grasses.png" alt="grass-like plant icon" />
      <h4 className={styles.h4Content}>Grass-like Plants</h4>
      <p>In progress</p>
    </div>
  )
}

export default GrassLike