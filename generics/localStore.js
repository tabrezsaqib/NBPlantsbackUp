import Cookies from "js-cookie"

export function setProfile(profile) {
  Cookies.set("z_user", JSON.stringify(profile))
}

export function getProfile() {
  const profile = Cookies.get("z_user")
  return profile ? JSON.parse(profile) : {}
}

export function setToken(idToken) {
  Cookies.set("z_jwt_token", idToken)
}

export function getToken() {
  return Cookies.get("z_jwt_token")
}

export function getCurrentPage() {
  return Cookies.get("z_page")
}

export function setCurrentPage(currentPage) {
  Cookies.set("z_page", currentPage)
}
export function getCurrentSearchPage() {
  return Cookies.get("z_search_page")
}

export function setCurrentSearchPage(currentSearchPage) {
  Cookies.set("z_search_page", currentSearchPage)
}

export function getActiveFilter() {
  return Cookies.get("z_filter")
}

export function setActiveFilter(active) {
  Cookies.set("z_filter", JSON.stringify(active))
}
// export function setHeader(headers) {
//   Cookies.set("z_jwt_header", JSON.stringify(headers))
// }

// export function getHeader() {
//   const header = Cookies.get("z_jwt_header")
//   return header ? JSON.parse(header) : {}
// }

export function removeItem() {
  Cookies.remove("z_jwt_token")
  Cookies.remove("z_user")
  Cookies.remove("z_page")
}