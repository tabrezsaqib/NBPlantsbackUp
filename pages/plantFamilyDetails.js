import Footer from "../components/layouts/Footer";
import Head from "next/head";
import Navbar from "../components/layouts/Navbar";
import FamilyDetails from "../components/families/familyDetails";

const PlantFamilyDetails = () => {
  return (
    <>
      <Head>
        <title>Family Details | New Brunswick Plants</title>
      </Head>
      <Navbar />
      <FamilyDetails />
      <Footer />
    </>
  )
}
export default PlantFamilyDetails