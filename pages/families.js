/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";

import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Navbar from "../components/layouts/Navbar";


const families = () => {
  return (
    <>
    <Header />
    <Navbar />
    <div>
      <div className="familiesPageContainer">
        <iframe 
        className="familiesPageContent"
        src="https://api-v2.newbrunswickplants.ca/plant-families/">
        </iframe>
      </div>
      <style jsx>
      {`
        .familiesPageContainer{
        position: relative;
        overflow:hidden;
        margin:0;
        height:100%;
        padding-top: 100vh;
        }
        .familiesPageContent{
          position: absolute;
          top:0;
          border: 0;
          margin:0;
          left:0;
          width: 105%;
          height:100%;
        }
        @media screen and (min-width: 1200px){
          .familiesPageContainer{
            padding-top:9500px;
           }
           .familiesPageContent{
            position: absolute;
            width: 100%;
            height:  9500px;
            top:0;
            border: 0;
            margin:0;
            left:0;
           }
          }
      `}
    </style>
    </div>
    <Footer />
    </>
  )
}

export default families;