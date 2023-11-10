import Headline from "../components/overview/Headline"
import SpeciesOption from "../components/overview/SpeciesOption"
import "bootstrap-icons/font/bootstrap-icons.css"
import styles from "../styles/home.module.css"


import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Navbar from "../components/layouts/Navbar";

export default function home() {
  return (
    <>
    <Header />
    <Navbar />
    <div className={styles.main}>
      <div className={styles.selectionArea}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex flex-column text-center">
              <Headline />
              <SpeciesOption />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}