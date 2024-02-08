import * as localStore from "./localStore"
import jwt from "jsonwebtoken"
export default class AuthService {
  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    let token = localStore.getToken()
    return !!token && !this.isTokenExpired(token)
  }

  logOut = () => {
    localStore.removeItem()
  }

  // getTokenExpirationDate = (token) => {
  //   if (!token.expiry) return null
  //   const date = new Date(0)
  //   date.setUTCSeconds(token.expiry)
  //   return date
  // }

  isTokenExpired(token) {
    let isExpired = false
    var decodedToken = jwt.decode(token, { complete: true })
    var dateNow = new Date()
    if (decodedToken.exp < dateNow.getTime()) isExpired = true

    return false
  }
}