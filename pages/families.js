/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/families.module.css"

import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Navbar from "../components/layouts/Navbar";


const families = () => {
  return (
    <>
    <Header />
    <Navbar />
    <div>
      <div className={styles.familiesPageContainer}>
        <iframe 
        className={styles.familiesPageContent}
        src="https://devsite-nbplants.api-v2.newbrunswickplants.ca/plant-families/">
        </iframe>
      </div>
      <style jsx>
      {`
        
      `}
    </style>
    </div>
    <Footer />
    </>
  )
}

export default families;