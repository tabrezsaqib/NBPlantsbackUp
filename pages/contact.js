/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/contact.module.css"


import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Navbar from "../components/layouts/Navbar";


const contact = () => {
  return (
    <>
    <Header />
    <Navbar />
    <div>
      <div className={styles.contactPageContainer}>
        <iframe 
        className={styles.contactPageContent}
        src="https://api-v2.newbrunswickplants.ca/contact-us/">
        </iframe>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default contact;