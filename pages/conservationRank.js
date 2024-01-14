import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Navbar from "../components/layouts/Navbar";
import ConservationRank from "../components/conservation-rank/conservationRank";

const ConservationRankPage = () => {
    return (
        <>
            <Header />
            <Navbar />
            <ConservationRank/>
            <Footer />
        </>
    )
}

export default ConservationRankPage