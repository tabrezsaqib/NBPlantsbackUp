import "bootstrap-icons/font/bootstrap-icons.css"
import AuthComponent from "../components/front/AuthComponent"
import Navbar from "../components/layouts/Navbar";
import styles from "../styles/index.module.css"
import Head from "next/head"
import Headline from "../components/overview/Headline"
import SpeciesOption from "../components/overview/SpeciesOption"
import Footer from "../components/layouts/Footer";

export default function Index() {
  return (
    <div className={styles.main}>
      <Head>
        <title>Home | NB Plants</title>
      </Head>
      {/* <div className={styles.selectionArea}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex flex-column text-center">
              <AuthComponent />
            </div>
          </div>
        </div>
      </div> */}
      <Navbar />
      <div className="col-md-12 col-lg-12 " >
        <div className="d-flex flex-column text-center">
          <Headline />
          <SpeciesOption />
        </div>
      </div>
      <Footer isFixed={true} />
    </div>
  )
}