import Footer from "../components/layouts/Footer";
import Head from "next/head";
import Navbar from "../components/layouts/Navbar";
import Families from "../components/families/families";

const PlantFamilies = () => {
    return (
        <>
            <Head>
                <title>Families | New Brunswick Plants</title>
            </Head>
            <Navbar />
            <Families/>
            <Footer />
        </>
    )
}

export default PlantFamilies