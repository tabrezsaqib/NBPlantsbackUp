import "bootstrap-icons/font/bootstrap-icons.css"
import AuthComponent from "../components/front/AuthComponent"
import styles from "../styles/index.module.css"
import Head from "next/head"

export default function Index() {
  return (
    <div className={styles.main}>
      <Head>
        <title>Home | New Brunswick Plants</title>
      </Head>
      <div className={styles.selectionArea}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex flex-column text-center">
              <AuthComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}