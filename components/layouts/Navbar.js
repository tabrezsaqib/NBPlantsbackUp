/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Router from "next/router"
import SearchForm from "../search/SearchForm"
import { useDispatch } from "react-redux"
import { togglePagination } from "../../redux/actions/paginationAction"
import React, {Component} from "react"
import styles from "../../styles/Navbar.module.css"

const Navbar = () => {
  const dispatch = useDispatch()
  const refresh = () => {
    localStorage.setItem("route", "all")
    dispatch(togglePagination(true))
    Router.push({
      pathname: "/plants",
      query: { type: "all" },
    }).then(() => {
      Router.reload()
    })
  }
  return (
    <div>
      <nav className={[styles.navContainer, "navbar", "navbar-expand-lg", "fixed-top", "navbar-light", "bg-light"].join(" ")}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            <div className={[styles.logoContainer, "logo-container"].join(" ")}>
              <img
                className={styles.logoImg}
                src="../../images/logo.png"
                alt="new brunswick plants logo"
              />
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarScroll">
            <ul className={[styles.navbarNav, "navbar-nav"].join(" ")}>
              <li className={[styles.navItem, "nav-item"].join(" ")}>
                <a className="nav-link active" aria-current="page" href="/home">
                  Home
                </a>
              </li>
              <li className={[styles.navItem, "nav-item"].join(" ")} onClick={refresh}>
                <a className="nav-link">Species</a>
              </li>
              <li className={[styles.navItem, "nav-item"].join(" ")} >
                <a className="nav-link" aria-current="page" href="/plantFamilies">Families</a>
              </li>
              <li className={[styles.navItem, "nav-item"].join(" ")}>
                <a className="nav-link" href="/about" tabIndex="-1">
                  About
                </a>
              </li>
            </ul>
            <SearchForm />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar