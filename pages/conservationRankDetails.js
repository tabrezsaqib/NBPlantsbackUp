import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import ConservationRankDetails from "../components/conservation-rank/conservationRankDetails";
import Head from "next/head";
import { useRouter} from "next/router";

const ConservationRankDetailsPage = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{router.query.keyword === 'Invasive'? 'Invasive Species' : 
        router.query.keyword === 's1: critically imperiled'? 'S1'
        : router.query.keyword === 's2: imperiled'? 'S2'
        : router.query.keyword === 's3: vulnerable'? 'S3'
        : router.query.keyword === 's4: apparently secure'? 'S4'
        : router.query.keyword === 's5: secure'? 'S5'
        : 'SNA'} | NB Plants</title>
      </Head>
      <Navbar />
      <ConservationRankDetails />
      <Footer />
    </>
  )
}
export default ConservationRankDetailsPage