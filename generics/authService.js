import jwt from "jsonwebtoken"
import * as localStore from "./localStore"
export default class AuthService {
  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = localStore.getToken()
    return !!token && !this.isTokenExpired(token)
  }

  // eslint-disable-next-line class-methods-use-this
  logOut = () => {
    localStore.removeItem()
  }

  // eslint-disable-next-line class-methods-use-this
  isTokenExpired(token) {
    let isExpired = false
    const decodedToken = jwt.decode(token, { complete: true })
    const dateNow = new Date()
    // eslint-disable-next-line no-unused-vars
    if (decodedToken.exp < dateNow.getTime()) isExpired = true

    return false
  }
}