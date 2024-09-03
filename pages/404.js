/* eslint-disable @next/next/no-img-element */
import React from "react";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Head from "next/head";
import Alert from '@mui/material/Alert';
import { AlertTitle } from "@mui/material";
import styles from "../styles/SearchResults.module.css"

const PageNotFound = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | New Brunswick</title>
      </Head>
      <Navbar />
      <div className="flex-column d-flex align-items-center justify-content-center">
            <h2 style={{margin: '20px 0 0 0'}}>Page Not Found!</h2>
            <div className="site-in-progress">
                            404 | Sorry, the page could not be found.
            </div>
            <img
              src="../../images/data_not_found.png"
              width="30%"
              alt="data not found"
            />
          </div>
      <Footer isFixed={true} />
    </>
  )
}

export default PageNotFound;
