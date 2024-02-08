import { createWrapper } from "next-redux-wrapper"
import store from "../redux/store"
import Layout from "../components/layouts/Layout"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)
export default wrapper.withRedux(MyApp)