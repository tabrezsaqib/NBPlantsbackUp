/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/resources.module.css"

import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Navbar from "../components/layouts/Navbar";



const resources = () => {
  return (
    <>
    <Header />
    <Navbar />
    <div>
      <div className={styles.resourcesPageContainer}>
        <iframe 
        className={styles.resourcesPageContent}
        src="https://api-v2.newbrunswickplants.ca/resources/">
        </iframe>
      </div>
    </div>
    <Footer />
  </>
  )
}

export default resources;

