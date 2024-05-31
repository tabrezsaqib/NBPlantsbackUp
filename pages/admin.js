import Admin from "../components/main/Admin"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Head from "next/head";



const admin = () => {
  return (
    <>
    <Head>
        <title>Admin | NB Plants</title>
    </Head>
    <Navbar />
    <>
      <ToastContainer />
      <Admin />
    </>
    <Footer />
    </>
  )
}

export default admin;