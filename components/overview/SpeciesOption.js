import React from "react"
import NonWoodyPlantSelector from "../species-selectors/NonWoodyPlantSelector"
import WoodyPlantSelector from "../species-selectors/WoodyPlantSelector"
import Router from "next/router"
import styles from "../../styles/Global.module.scss"
import Ferns from "../species-selectors/Ferns"
import GrassLike from "../species-selectors/GrassLike"
import localstyles from "../../styles/SpeciesOption.module.css"
import Link from "next/link"

const SpeciesOption = () => {
  const optionSelector = (type) => {
    if (type == "Woody") {
      localStorage.setItem("route", "Woody")
      Router.push({
        pathname: "/plants",
        query: {
          type: "Woody",
        },
      }).then(() => {
        // Router.reload()
      })
    }
    if (type == "Non-woody") {
      localStorage.setItem("route", "Non-woody")
      Router.push({
        pathname: "/plants",
        query: {
          type: "Non-woody",
        },
      }).then(() => {
        // Router.reload()
      })
    }
    if (type == "Fern") {
      localStorage.setItem("route", "Fern")
      Router.push({
        pathname: "/plants",
        query: {
          type: "Fern",
        },
      }).then(() => {
        // Router.reload()
      })
    }
    if (type == "Grass") {
      localStorage.setItem("route", "Grass")
      Router.push(
      "/grass"
      )
      .then(() => {
        // Router.reload()
      })
    }
  }
  return (
    <div className="d-flex justify-content-center">
      <div
        className={[
          styles.responsive_selection_blocks,
          "selection-blocks d-flex align-items-center justify-content-evenly",
        ].join(" ")}>
        <a className={localstyles.speciesLink} onClick={() => optionSelector("Fern")}>
          <Ferns />
        </a>
        <a
        // className={localstyles.speciesLink} 
        // onClick={() => optionSelector("Grass")} 
        className={localstyles.disabled}
        >
          <GrassLike />
        </a>
        <a className={localstyles.speciesLink} onClick={() => optionSelector("Woody")}>
          <WoodyPlantSelector />
        </a>
        <a className={localstyles.speciesLink} onClick={() => optionSelector("Non-woody")}>
          <NonWoodyPlantSelector />
        </a>
      </div>
    </div>
  )
}

export default SpeciesOption