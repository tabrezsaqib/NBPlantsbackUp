/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
// import Footer from "./Footer"
import { connect } from "react-redux"
import Navbar from "./Navbar"


function Layout({ children, authentication_state }) {
  return (
    <>
        {authentication_state?
        <>
        <Navbar />
        </>
        : null}
        <div className="container-fluid">
          <main>{children}</main>
        </div>
    </>
  )
}

const mapStateToProps = (state) => ({
    authentication_state: state.authenticate.authentication_state
  })

export default connect(mapStateToProps)(Layout);