import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import { adminLogin } from "../../redux/actions/loginAction"
import AuthService from "../../generics/authService"
import LoginForm from "./LoginForm"

const Login = ({ user_data }) => {
  const router = useRouter()
  const [error, setError] = useState("")
  const auth = new AuthService()
  const isLoggedIn = auth.loggedIn()
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/admin")
    }
  }, [isLoggedIn, router])
  const dispatch = useDispatch()
  const login = (details) => {
    dispatch(adminLogin(details)).then(() => {
      router.push("/admin")
    })
  }

  return (
    <div>
      <LoginForm login={login} error={error} />
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user_data: state.user.user_data,
  }
}

export default connect(mapStateToProps)(Login)