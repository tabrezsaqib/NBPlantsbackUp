import Login from "../components/login/Login"

import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Head from "next/head";


const login = () => {
  return (
<>
      <Head>
        <title>Login | New Brunswick Plants</title>
      </Head>
    <Navbar />
    <Login />
    <Footer />
</>

  )
}

export default login