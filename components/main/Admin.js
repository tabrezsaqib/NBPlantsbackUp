/* eslint-disable react/button-has-type */
import Router from "next/router"
import { useEffect, useState } from "react"
import DataUploader from "../uploader/DataUploader"
import AuthService from "../../generics/authService"

function Admin() {
  const [mounted, setMounted] = useState(false)
  const auth = new AuthService()
  const isLoggedIn = auth.loggedIn()

  useEffect(() => {
    setMounted(true)
    if (!isLoggedIn) {
      Router.push("/login")
    }
  }, [isLoggedIn]) // This array is a dependency array, which runs this effect will only when the values in the array changes. So, if there is any item in the array, it will make the DOM re-render based on the item in the array...

  const onLogOut = () => {
    auth.logOut()
    Router.push("/login")
  }

  return (
    mounted && (
      <div>
        <div className="d-flex justify-content-center align-items-center">
          <h4 className="mt-4 me-3">Drag and drop your files here...</h4>
          <button className="btn btn-success" onClick={onLogOut}>
            Log out
          </button>
        </div>
        {isLoggedIn === true && (
          <div>
            <DataUploader />
          </div>
        )}
      </div>
    )
  )
}

export default Admin