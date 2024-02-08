import Admin from "../components/main/Admin"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Navbar from "../components/layouts/Navbar";


const admin = () => {
  return (
    <>
    <Header />
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