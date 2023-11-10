// import Footer from "./Footer"
import Footer from "./Footer"
import Header from "./Header"
import Navbar from "./Navbar"
import { connect, useDispatch } from "react-redux"
import { authenticateAction } from '../../redux/actions/authenticateAction';


const Layout = ({ children, authentication_state }) => {
  const dispatch = useDispatch();
  return (
    <>
        {authentication_state?
        <>
        <Header />
        <Navbar />
        </>
        : null}
        <div className="container-fluid">
          <main>{children}</main>
        </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    authentication_state: state.authenticate.authentication_state
  }
}

export default connect(mapStateToProps)(Layout);
