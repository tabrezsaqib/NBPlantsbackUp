import styles from "../styles/about.module.css"
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Head from "next/head";

const about = () => {
  return (
    <>
      <Head>
        <title>About | New Brunswick Plants</title>
      </Head>
      <Navbar />
      <div>
        <div className={styles.aboutPageContainer}>
          <iframe
            className={styles.aboutPageContent}
            src="https://api-v3.newbrunswickplants.ca/elementor-7299/">
          </iframe>
        </div>
      </div>
      <Footer isFixed={true} />
    </>
  )
}

export default about;