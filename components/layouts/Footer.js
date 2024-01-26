/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React, {Component} from "react"
import Router from "next/router"
import { useDispatch } from "react-redux"
import { togglePagination } from "../../redux/actions/paginationAction"
import styles from "../../styles/Global.module.scss"
import localstyles from "../../styles/Footer.module.css"
import Link from "next/link"


const Footer = () => {
  const dispatch = useDispatch()
  const refresh = () => {
    dispatch(togglePagination(true))
    Router.push({
      pathname: "/plants",
      query: { type: "all" },
    }).then(() => {
      Router.reload()
    })
  }
  return (
    <section className={[localstyles.footer, "footer"].join(" ")}>
      <div className="container">
        <div className="row d-flex">
          <div className="col-lg-1">
            <div className={[localstyles.footerBrief, "footer-brief"].join(" ")}>
              <Link href="/home" as="/home" legacyBehavior>
                <a>
                  <img
                    src="../../images/logo-dark.png"
                    alt="newbrunswick plants logo"
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="sponsor d-flex justify-content-between align-items-start mb-4">
              <div className={[localstyles.logoContainer, "logo-container"].join(" ")}>
                <a
                  href="https://www.frederictonbotanicgarden.com/"
                  target="_blank"
                  rel="noreferrer">
                  <img
                  className={localstyles.imgContent}
                    src="../../images/botanic-garden-dark.png"
                    height="47"
                    alt="logo"
                  />
                </a>
              </div>
              <div className="d-flex flex-column align-items-center text-center">
                <div className={[localstyles.logoContainer, "logo-container"].join(" ")}>
                  <a
                    href="https://www2.gnb.ca/content/gnb/en/services/services_renderer.13136.Environmental_Trust_Fund.html"
                    target="_blank"
                    rel="noreferrer">
                    <img className={localstyles.imgContent} src="../../images/nb-logo.png" alt="logo" />
                  </a>
                </div>
                <span className={[localstyles.partnershipTagline, "partnership-tagline"].join(" ")}>
                  Your Environmental Trust Fund at Work
                </span>
              </div>
              <div>
                <p className={[localstyles.logoHeader, "logo-header"].join(" ")}>
                  <strong>In Partnership with</strong>
                </p>
                <div className={[localstyles.logoContainer, "logo-container"].join(" ")}>
                  <a href="http://accdc.com//" target="_blank" rel="noreferrer">
                    <img className={localstyles.imgContent} src="../../images/logoACCDC2014.png" alt="logo" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 d-flex justify-content-around">
            <div
              className={[styles.footer_media_query, localstyles.footerNav, "footer-nav"].join(" ")}>
              <ul className={[localstyles.footerList, "d-flex", "flex-column", "flex-wrap"].join(" ")}>
                <li className={localstyles.footerListItem}>
                  <Link href='/home' as={`/home`} legacyBehavior>
                    <a className={localstyles.footerLink}>Home</a>
                  </Link>
                </li>
                <li className={localstyles.footerListItem}>
                  <Link href='/plants/?type=all' as={`/plants/?type=all`} legacyBehavior>
                    <a className={localstyles.footerLink}>Species</a>
                  </Link>
                </li>
                <li className={localstyles.footerListItem}>
                  <Link href='/glossary' as={`/glossary`} legacyBehavior>
                    <a className={localstyles.footerLink}>Glossary</a>
                  </Link>
                </li>
                <li className={localstyles.footerListItem}>
                  <Link href='/contact' as={`/contact`} legacyBehavior>
                    <a className={localstyles.footerLink}>Contact Us</a>
                  </Link>
                </li>
                <li className={localstyles.footerListItem}>
                  <Link href='/plantFamilies' as={`/plantFamilies`} legacyBehavior>
                    <a className={localstyles.footerLink}>Families</a>
                  </Link>
                </li>
                <li className={localstyles.footerListItem}>
                  <Link href='/resources' as={`/resources`} legacyBehavior>
                    <a className={localstyles.footerLink}>Resources</a>
                  </Link>
                </li>
                <li className={localstyles.footerListItem} >
                  <Link href='/conservationRank' as={`/conservationRank`} legacyBehavior>
                    <a className={localstyles.footerLink}>Conservation Rank</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer