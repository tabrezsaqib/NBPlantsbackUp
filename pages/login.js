import Router from "next/router"
import Login from "../components/login/Login"

import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Navbar from "../components/layouts/Navbar";

const login = () => {
  return (
<>
    <Header />
    <Navbar />
    <Login />
    <Footer />
</>

  )
}

export default login