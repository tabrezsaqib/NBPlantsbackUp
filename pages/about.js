/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from  "../styles/about.module.css"

import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Navbar from "../components/layouts/Navbar";



const about = () => {
  return (
<>
    <Header />
    <Navbar />
    <div>
      <div className={styles.aboutPageContainer}>
        <iframe 
        className={styles.aboutPageContent}
        src="https://devsite-nbplants.api-v2.newbrunswickplants.ca/elementor-7299/">
        </iframe>
      </div>
    </div>
    <Footer />
</>
  )
}

export default about;