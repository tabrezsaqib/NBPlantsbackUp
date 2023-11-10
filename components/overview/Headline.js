import React from "react"
import styles from "../../styles/Headline.module.css"

const Headline = () => {
  return (
    <div className="mb-4">
      <h2 className={styles.h2Content}>Discover the Plants of New Brunswick</h2>
      <p className={styles.pContent}>
        A pictorial guide to the plants of New Brunswick.
        <br />
        Additional plants will be added in future years.
      </p>
    </div>
  )
}

export default Headline