import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import ConservationRankDetails from "../components/conservation-rank/conservationRankDetails";
import Head from "next/head";

const ConservationRankDetailsPage = () => {
  return (
    <>
      <Head>
        <title>Conservation Rank Details | New Brunswick Plants</title>
      </Head>
      <Navbar />
      <ConservationRankDetails />
      <Footer />
    </>
  )
}
export default ConservationRankDetailsPage