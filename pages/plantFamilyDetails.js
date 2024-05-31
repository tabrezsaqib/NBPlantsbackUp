import Footer from "../components/layouts/Footer";
import Head from "next/head";
import Navbar from "../components/layouts/Navbar";
import FamilyDetails from "../components/families/familyDetails";
import { useRouter } from "next/router"

const PlantFamilyDetails = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{router.query.keyword} | NB Plants</title>
      </Head>
      <Navbar />
      <FamilyDetails />
      <Footer />
    </>
  )
}
export default PlantFamilyDetails