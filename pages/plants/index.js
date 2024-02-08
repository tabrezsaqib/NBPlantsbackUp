import React from "react"
import Plants from "../../components/species-selectors/Plants"
import Header from "../../components/layouts/Header"
import Navbar from "../../components/layouts/Navbar"
import Footer from "../../components/layouts/Footer"

const plants = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div>
        <Plants itemsPerPage={12} />
      </div>
      <Footer />
    </>
  )
}

export default plants;