import { useState } from "react"
import styles from "../../styles/LoginForm.module.css"

// eslint-disable-next-line react/prop-types
function LoginForm({ login }) {
  const [details, setDetails] = useState({ username: "", password: "" })

  const submitHandler = (e) => {
    e.preventDefault()
    login(details)
  }
  return (
    <div className="row">
        <div className="col-lg-4" />
        <div className="col-lg-4">
          <h2 className="text-center mt-4">Please login as Admin</h2>
          <div className={[styles.formSection, "form-section"].join(" ")}>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                {/* <label htmlFor="username">Username</label> */}
                <input
                  type="text"
                  className="form-control mb-3"
                  aria-describedby="username"
                  placeholder="Username"
                  onChange={(e) =>
                    setDetails({ ...details, username: e.target.value })
                  }
                  value={details.username}
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="exampleInputPassword1">Password</label> */}
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  onChange={(e) =>
                    setDetails({ ...details, password: e.target.value })
                  }
                  value={details.password}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-4" />
      </div>
  )
}

export default LoginForm