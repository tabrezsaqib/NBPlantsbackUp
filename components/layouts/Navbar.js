/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import Router from "next/router"
import SearchForm from "../search/SearchForm"
import { useDispatch } from "react-redux"
import { togglePagination } from "../../redux/actions/paginationAction"
import React, {Component} from "react"
import styles from "../../styles/Navbar.module.css"
import Link from "next/link"
import { fetchAllPlantPosts } from "../../redux/actions/getPlantsAction"
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch()
  const { all_plants } = useSelector(state => state.post)

  useEffect(() => {
    if (all_plants.length <= 0)
      dispatch(fetchAllPlantPosts())
  }, [])

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
          <Link href="/home" as="/home" legacyBehavior>
            <a className="navbar-brand">
              <div className={[styles.logoContainer, "logo-container"].join(" ")}>
                <img
                  className={styles.logoImg}
                  src="../../images/logo.png"
                  alt="new brunswick plants logo"
                />
              </div>
            </a>
          </Link>
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
                <Link href='/home' as={`/home`} legacyBehavior>
                  <a className="nav-link active">
                    Home
                  </a>
                </Link>
              </li>
              <li className={[styles.navItem, "nav-item"].join(" ")}>
                <Link href='/plants/?type=all' as={`/plants/?type=all`} legacyBehavior>
                  <a className="nav-link active">Species</a>
                </Link>
              </li>
              <li className={[styles.navItem, "nav-item"].join(" ")} >
                <Link href='/plantFamilies' as={`/plantFamilies`} legacyBehavior>
                  <a className="nav-link active">Families</a>
                </Link>
              </li>
              <li className={[styles.navItem, "nav-item"].join(" ")}>
                <Link href='/about' as={`/about`} legacyBehavior>
                  <a className="nav-link acyive">
                    About
                  </a>
                </Link>
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