import SearchResults from "../components/search/SearchResults"
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Navbar from "../components/layouts/Navbar";

const search = () => {
  return (
    <>
    <Header />
    <Navbar />
    <div className="pt-4">
      <SearchResults itemsPerPage={20} />
    </div>
    <Footer />
  </>
  )
}

export default search