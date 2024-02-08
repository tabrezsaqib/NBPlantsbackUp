/* eslint-disable @next/next/no-img-element */
import React, {useLayoutEffect, useEffect, useRef, useState, Component, ReactPropTypes } from "react";
import axios from "axios";
import * as ReactDOM  from 'react-dom';
import styles from  "../styles/glossary.module.css"

import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Navbar from "../components/layouts/Navbar";


function Glossary  () {

  const [bodyHeight, setbodyHeight] = useState(0);
  const elementRef = useRef();

  return (
    <>
    <Header />
    <Navbar />
    <div>
       <div  className={styles.glossaryPageContainer}>
      
        <iframe 
        className={styles.glossaryPageContent}
        src="https://devsite-nbplants.api-v2.newbrunswickplants.ca/glossary/"
frameBorder="0"
        >
        </iframe>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Glossary;