import { createWrapper } from "next-redux-wrapper"
import store from "../redux/store"
import Layout from "../components/layouts/Layout"
import "../styles/globals.css"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)
export default wrapper.withRedux(MyApp)