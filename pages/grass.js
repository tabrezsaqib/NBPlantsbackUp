/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/grass.module.css"
import Router from "next/router"
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Navbar from "../components/layouts/Navbar";


const grass = () => {
  const optionSelector = (type) => {
    if (type == "Woody") {
      localStorage.setItem("route", "Woody")
      Router.push({
        pathname: "/plants",
        query: {
          type: "Woody",
        },
      }).then(() => {
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
      })
    }
  }
  return (
    <>
    <Header />
    <Navbar />
    <div>
      <div className={styles.contactPageContainer}>
        {/* <iframe 
        className={styles.contactPageContent}
        src="https://api-v2.newbrunswickplants.ca/contact-us/">
        </iframe> */}
        <h2 className={styles.heading}>
          <strong>Grasses, Rushes, Sedges</strong>
        </h2>
        <div className={styles['table-container']}>
          <table className={styles['data-table']}>
            <thead>
              <tr>
                <th></th>
                <th><a className={styles['grass-types-link']} onClick={() => optionSelector("Woody")}>Grasses (<em>Poaceae</em>)</a></th>
                <th><a className={styles['grass-types-link']} onClick={() => optionSelector("Non-woody")}>Rushes (<em>Juncaceae</em> and <em>Juncaginaceae</em>)</a></th>
                <th><a className={styles['grass-types-link']} onClick={() => optionSelector("Fern")}>Sedges (<em>Cyperaceae</em>)</a></th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td><strong>Stem</strong></td>
                  <td>Usually round (<em>or flattened</em>) in cross-section Hollow Nodes conspicuous</td>
                  <td>Usually round in cross-section Filled with sponge like pith Nodes not distinct</td>
                  <td>Usually triangular in cross-section (sometimes rounded) Solid stems, rarely hollow Nodes indistinct</td>
                </tr>
                <tr>
                  <td><strong>Leaf position</strong></td>
                  <td>2 vertical rows</td>
                  <td>3 vertical rows</td>
                  <td>3 vertical rows</td>
                </tr>
                <tr>
                  <td><strong>Leaf blade</strong></td>
                  <td>Usually flat, often folded, involute, or bristle-like Smooth or hairy</td>
                  <td>Channelled or round Usually smooth</td>
                  <td>Flat, folded, or bristle-like Rarely hairy</td>
                </tr>
                <tr>
                  <td><strong>Leaf edges</strong></td>
                  <td>Smooth, scabrous or finely hairy</td>
                  <td>Smooth</td>
                  <td>Usually scabrous</td>
                </tr>
                <tr>
                  <td><strong>Ligules</strong></td>
                  <td>Usually present</td>
                  <td>Absent or weakly developed</td>
                  <td>Absent or weakly developed</td>
                </tr>
                <tr>
                  <td><strong>Collar</strong></td>
                  <td>Distinct</td>
                  <td>Indistinct</td>
                  <td>Indistinct</td>
                </tr>
                <tr>
                  <td><strong>Fruit</strong></td>
                  <td>Grain, a solitary seed enclosed in a membrane, subtended by 2 floral scales</td>
                  <td>Capsule subtended by 6 floral scales, each capsule enclosing 3 to many seeds</td>
                  <td>Single achene subtended by a single floral scale</td>
                </tr>
            </tbody>
          </table>
          <p className={styles['table-paragraph']}>
            There are a number of plants that have grass-like leaves and when not blooming can 
            easily be mistaken for a grass, rush, or sedge. Examples include Seaside Plantain (<em><b>Plantago maritima</b></em>), 
            Strict Blue-eyed-grass (<em><b>Sisyrinchium montanum</b></em>), American Shoreweed (<em><b>Littorella americana</b></em>), 
            Water Awlwort (<em><b>Subularia aquatica</b></em>), and other members of the Melanthiaceae, Iris, Typhaceae, 
            Xyricaceae families. Try searching within Non-woody Plants if a grass-like plant you are trying to identify 
            does not appear in this section.
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default grass;