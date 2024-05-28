import SearchResults from "../components/search/SearchResults"
import Footer from "../components/layouts/Footer";
import Head from "next/head";
import Navbar from "../components/layouts/Navbar";

const search = () => {
  return (
    <>
      <Head>
          <title>Search | New Brunswick Plants</title>
      </Head>
      <Navbar />
      <div className="pt-4">
        <SearchResults itemsPerPage={20} />
      </div>
      <Footer />
  </>
  )
}

export default search