/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react"
import * as api from "../../generics/api"
import { Slide } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"
import { useRouter } from "next/router"
import Router from "next/router"
import ReactHtmlParser from "react-html-parser"
import styles from "../../styles/Global.module.scss"


import Header from "../layouts/Header"
import Navbar from "../layouts/Navbar"
import Footer from "../layouts/Footer"
import Link from "next/link"
import { useDispatch } from "react-redux"
import FamilyDetails from "../families/familyDetails"

const PlantSpeciesDetails = ({ plant_details }) => {
  const [slide, setSlide] = useState(false)
  const [slideIndex, setSlideIndex] = useState(null)
  const slideRef = useRef()
  const router = useRouter()
  const dispatch = useDispatch()
  const API_URL = process.env.API_URL

  const slideShow = (index) => {
    setSlide(true)
    setSlideIndex(index)
  }

  const back = () => {
    slideRef.current.goBack()
    setSlideIndex(0)
  }

  const next = () => {
    slideRef.current.goNext()
    setSlideIndex(0)
  }

  const properties = {
    autoplay: false,
    arrows: false,
    indicators: true,
  }

  const loadPlantFamily = async (param) => {
    if (param) {
      Router.push({
        pathname: "/plantFamilyDetails",
        query: { keyword: param },
      }).then(() => {
      })
    }
  }

  const formatCase = (data) => {
    if (data.search('sna') >= 0 || data.search('Sna') >= 0) {
      return data.replace(/sna/ig,'SNA')  
    }else{
      return data
    }
  }

  const capitalizeAfterColon = (inputString) => {
    return inputString.replace(/(:\s*\w)/g, match => match.toUpperCase());
  }

  const refresh = () => {
    let route = localStorage.getItem("route")
    Router.push({
      pathname: "/plants",
      query: {
        type:
          route == "all"
            ? "all"
            : route == "Non-woody"
            ? "Non-woody"
            : route == "Woody"
            ? "Woody"
            : route == "Fern" && "Fern",
      },
    }).then(() => {})
  }
  return (
    <>
    <Header />
    <Navbar />
    <div className="mt-3">
      {plant_details.length !== 0 ? (
        <div className="row" key={plant_details.id}>
          <div className="col-lg-3" style={{borderRight: '1px solid #e0e1e3'}}> 
            <div className="side-bar">
              <div className={styles.intro_media_mobile}>
                <div className="d-flex justify-content-between">
                  <span>&nbsp;</span>
                  <a className="d-flex back-arrow" onClick={() => refresh()}>
                    <h4>
                      <i className="bi bi-arrow-left"></i>
                    </h4>
                    <p>&nbsp;Back to Search</p>
                  </a>
                </div>
                <div className="d-flex flex-column mt-2">
                  <div className="d-flex">
                    <h2 className="heading">
                      <strong>{plant_details.acf.common_name}</strong>
                    </h2>
                    <h4 className="align-self-center pt-2">
                      <strong>
                        <i>
                          &nbsp;&nbsp;
                          {`${plant_details.title}`}
                        </i>
                      </strong>
                    </h4>
                  </div>
                  {plant_details.acf.synonyms_english && (
                    <div className="d-flex">
                      <p>
                        <strong>Alternate Names: &nbsp;</strong>
                      </p>
                      {ReactHtmlParser(plant_details.acf.synonyms_english)}
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex flex-wrap">
                {Object.keys(plant_details.acf).includes("image_url") &&
                plant_details.acf.image_url !== undefined &&
                plant_details.acf.image_url.length > 0 ? (
                  plant_details.acf.image_url.slice(0, 6).map((item, index) => (
                    <div
                      key={index}
                      className={[
                        styles.img_container_media,
                        "img-container img-tabs",
                      ].join(" ")}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => slideShow(index)}>
                      <img src={item.thumbnail_image_url} alt="plant image" onContextMenu={(e)=>e.preventDefault()} />
                    </div>
                  ))
                ) : (
                  <div className="d-flex flex-column text-center stock-img-container">
                    <img src="../../images/no_result_found.png" alt="" onContextMenu={(e)=>e.preventDefault()} />
                    <span>Oops! No images found!</span>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-end mt-2">
                {Object.keys(plant_details.acf).includes("image_url") &&
                  plant_details.acf.image_url.length !== 0 &&
                  plant_details.acf.image_url.length > 6 && (
                    <a
                      data-bs-toggle="modal"
                      className="view-more"
                      data-bs-target="#exampleModal"
                      onClick={() => slideShow(slideIndex)}>
                      View more
                    </a>
                  )}
              </div>
              <div
                className={
                  plant_details.acf.unique_characteristics !== ""
                    ? "unique-characteristics"
                    : "hide"
                }>
                <p>
                  <strong>Unique Characteristics</strong>
                </p>
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <div className="unique-characteristics">
                      {ReactHtmlParser(
                        plant_details.acf.unique_characteristics
                      )}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    <div
                      className={
                        plant_details.featured_image.image_url !== null
                          ? "featured-image"
                          : "featured-image disable-pointer-events"
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#featured-image">
                      {plant_details.featured_image.image_url == null ? (
                        <div className="d-flex flex-column text-center stock-img-container">
                          <img src="../../images/no_result_found.png" alt="" onContextMenu={(e)=>e.preventDefault()} />
                          <span>Oops! No images found!</span>
                        </div>
                      ) : (
                        <img
                          src={plant_details.featured_image.image_url}
                          alt="plant image" onContextMenu={(e)=>e.preventDefault()}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
<br></br>
              <div>
                  {plant_details.acf.distribution_map_id ? <>
                  <p>
                    <strong>Distribution </strong>
                    <span style={{float:'right', fontSize:'12px' , display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                      Source: AC CDC, 2023
                        <span style={{ float: 'right', fontSize: '12px' }}>
                          <span className="grey-dot"></span>
                          Recent (&gt;= 2000)
                          <span className="green-dot"></span>
                          Historic (&lt; 2000)
                        </span>
                      </span>
                  </p>
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div
                        className={
                          plant_details.acf.distribution_map_id !== ''
                            ? "featured-image"
                            : "featured-image disable-pointer-events"
                        }
                        data-bs-toggle="modal"
                        data-bs-target="#distribution-map">
                           {plant_details.acf.distribution_map_id == '' ? (
                          <div className="d-flex flex-column text-center stock-img-container">
                            <img src="../../images/no_result_found.png" alt="" onContextMenu={(e)=>e.preventDefault()}/>
                            <span>Oops! No images found!</span>
                          </div>
                        ) : (
                          <img
                            src={`../../images/maps/${plant_details.acf.distribution_map_id}.png`}
                            alt="Distribution map" onContextMenu={(e)=>e.preventDefault()}
                          />
                        )}
                      </div>
                    </div>
                  </div></>:""}
              </div>
              {plant_details.acf.similar_species &&
                    <div>
                      <br></br>
                      <p><strong>Explore Similar Plants</strong></p>
                      <FamilyDetails plant_id={plant_details.acf.similar_species} />
                      {/* <ListPlantSpecies filteredList={plantFamily} isLoading={isLoading} /> */}
                    </div>
              }
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="slider">
                        <div className={!slide ? "hide" : ""}>
                          <Slide ref={slideRef} easing="ease" {...properties}>
                            {plant_details.acf.image_url !== undefined &&
                              plant_details.acf.image_url.length > 0 &&
                              plant_details.acf.image_url.map((item, index) => (
                                <div className="each-slide" key={index}>
                                  <div onContextMenu={(e)=>e.preventDefault()}
                                    style={{
                                      backgroundImage: `url(${
                                        plant_details.acf.image_url[
                                          slideIndex || index
                                        ].full_image_url
                                      })`,
                                    }}></div>
                                  <p className="img-caption" key={index}>{plant_details.acf.image_url[
                                      slideIndex || index
                                    ].caption}</p>
                                </div>
                              ))}
                          </Slide>

                          <h2 name="prev" onClick={() => back()}>
                            <i className="bi bi-arrow-left-circle-fill" />
                          </h2>
                          <h2 name="next" onClick={() => next()}>
                            <i className="bi bi-arrow-right-circle-fill" />
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="featured-image"
                tabIndex="-1"
                aria-labelledby="featured-image-label"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ margin: "0 auto" }}>
                      <div className="modal-image-container">
                        {plant_details.featured_image.image_url == null ? (
                          <div className="d-flex flex-column text-center stock-img-container">
                            <img
                              src="../../images/no_result_found.png"
                              alt="" onContextMenu={(e)=>e.preventDefault()}
                            />
                            {/* <h3>Oops! No images found!</h3> */}
                          </div>
                        ) : (
                          <div>
                            <img
                              src={plant_details.featured_image.image_url}
                              alt="plant image" onContextMenu={(e)=>e.preventDefault()}
                            />
                            <p className="img-caption">
                              {plant_details.featured_image.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                  className="modal fade"
                  id="distribution-map"
                  tabIndex="-1"
                  aria-labelledby="distribution-map-label"
                  aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"></button>
                      </div>
                      <div className="modal-body" style={{ margin: "0 auto" }}>
                        <div className="modal-image-container">
                          {plant_details.acf.distribution_map_id === '' ? (
                            <div className="d-flex flex-column text-center stock-img-container">
                              <img
                                src="../../images/no_result_found.png"
                                alt="" onContextMenu={(e)=>e.preventDefault()}
                              />
                              {/* <h3>Oops! No images found!</h3> */}
                            </div>
                          ) : (
                            <div>
                              <img
                                src={`../../images/maps/${plant_details.acf.distribution_map_id}.png`}
                                alt="Distribution map" onContextMenu={(e)=>e.preventDefault()}
                              />
                              <p className="img-caption">
                               <span>Source: </span>AC CDC, 2023
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
            </div>
          </div>
          <div className="col-lg-9">
            <div
              className={[
                styles.content_section_media_query,
                "content-section",
              ].join(" ")}>
              <div className={styles.intro_media_desktop}>
                <div className="d-flex justify-content-between">
                  <span>&nbsp;</span>
                  <a className="d-flex back-arrow" onClick={() => refresh()}>
                    <h4>
                      <i className="bi bi-arrow-left"></i>
                    </h4>
                    <p>&nbsp;Back to Search</p>
                  </a>
                </div>
                <div className="d-flex flex-column mt-2">
                  <div className="d-flex">
                    <h2 className="heading">
                      <strong>{plant_details.acf.common_name}</strong>
                    </h2>
                    <h4 className="align-self-center pt-2">
                      <strong>
                        <i>
                          &nbsp;&nbsp;
                          {plant_details.title}
                        </i>
                      </strong>
                    </h4>
                  </div>
                  {plant_details.acf.synonyms_english && (
                    <div className="d-flex">
                      <p>
                        <strong>Alternate Names: &nbsp;</strong>
                      </p>
                      {ReactHtmlParser(plant_details.acf.synonyms_english)}
                    </div>
                  )}
                </div>
              </div>
                {plant_details.acf.wolastoqey && (
                  <div className="d-flex">
                    <p>
                      <strong>Wolastoqey: &nbsp;</strong>
                    </p>
                    <p>{ReactHtmlParser(plant_details.acf.wolastoqey)}</p>
                  </div>
                )}
                {plant_details.acf.migmaq && (
                  <div className="d-flex">
                    <p>
                      <strong>Mi&apos;gmaq: &nbsp;</strong>
                    </p>
                    <p>{ReactHtmlParser(plant_details.acf.migmaq)}</p>
                  </div>
                )}
              {plant_details.acf.plant_family && (
                <div className="d-flex label-value-section">
                  <p>
                    <strong>Plant Family: &nbsp;</strong>
                  </p>
                  <span className="familyLink" onClick={() => loadPlantFamily(plant_details.acf.plant_family)}> {ReactHtmlParser(plant_details.acf.plant_family)}</span>
                  {plant_details.acf.family_english?<span>&#x3B;&nbsp;</span> : ""}
                  {plant_details.acf.family_english && (
                    <div className="d-flex">
                      <span className="familyLink" onClick={() => loadPlantFamily(plant_details.acf.plant_family)}> {ReactHtmlParser(plant_details.acf.family_english)}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="mb-3">
                {plant_details.acf.description && (
                  <div className="d-flex flex-column">
                    <div className="rtc-content">
                      {ReactHtmlParser(plant_details.acf.description)}
                    </div>
                  </div>
                )}
              </div>
              <div className="d-flex label-value-section mt-2">
                {plant_details.acf.plant_type && (
                  <div className="d-flex label-value-section">
                    <p>
                      <strong>Plant Type: &nbsp;</strong>
                      {api.capitalizeFirstLetter(plant_details.acf.plant_type)}
                    </p>
                  </div>
                )}
                {plant_details.acf.type.length !== 0 &&
                  plant_details.acf.type.map((item, index) => (
                    <div className="d-flex label-value-section" key={index}>
                      <p>
                        <strong>Type: &nbsp;</strong>
                      </p>
                      <div>
                        <p>
                          {api.capitalizeFirstLetter(item)}
                          &nbsp;
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <h4>
                <strong>Characteristics</strong>
              </h4>
              <hr />

              <div className="d-flex flex-column">
              {plant_details.acf.conservation_rank ?
                      plant_details.acf.conservation_rank.length !== 0 && (
                        <div className="d-flex">
                          <p>
                            <strong>Conservation Rank: &nbsp;</strong>
                          </p>
                          {plant_details.acf.conservation_rank.map(
                            (item, index) => (
                              <div className="d-flex" key={index}>
                                <p>
                                  {api.capitalizeFirstLetter(formatCase(capitalizeAfterColon(item)))}
                                  {item !==
                                    plant_details.acf.conservation_rank
                                      .slice(-1)
                                      .pop() ? (
                                    <span>, &nbsp;</span>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      ) : ''}
                {plant_details.acf.characteristics.invasive && (
                  <div className="d-flex label-value-section">
                    <p>
                      <strong style={{ color: 'red' }}>Invasive: &nbsp;</strong>
                      {plant_details.acf.characteristics.invasive}
                    </p>
                  </div>
                )}
                <div className="d-flex">
                  {plant_details.acf.characteristics.habitat.length !== 0 && (
                    <div className="d-flex">
                      <p>
                        <strong>Habitat: &nbsp;</strong>
                      </p>
                      {plant_details.acf.characteristics.habitat.map(
                        (item, index) => (
                          <div className="d-flex" key={index}>
                            <p>
                              {api.capitalizeFirstLetter(item)}
                              {item !==
                              plant_details.acf.characteristics.habitat
                                .slice(-1)
                                .pop() ? (
                                <span>, &nbsp;</span>
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}
                  <span>&#x3B;&nbsp;</span>
                  {plant_details.acf.characteristics.habitat_description && (
                    <div className="d-flex">
                      {plant_details.acf.characteristics.habitat_description}
                    </div>
                  )}
                </div>
                {plant_details.acf.characteristics.growth_form
                          .length !== 0 && (
                            <div className="d-flex label-value-section">
                              <p>
                                <strong>Growth Form: &nbsp;</strong>
                              </p>
                              {plant_details.acf.characteristics.growth_form.map(
                                (item, index) => (
                                  <div className="d-flex" key={index}>
                                    <p>
                                      {api.capitalizeFirstLetter(item)}
                                      {index + 1 === plant_details.acf.characteristics.growth_form.length ? '' : ","} &nbsp;
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                )}
                {plant_details.acf.characteristics.height && (
                  <div className="d-flex label-value-section">
                    <p>
                      <strong>Size: &nbsp;</strong>
                      {plant_details.acf.characteristics.height}
                    </p>
                  </div>
                )}
                {/* FLOWERS */}
                {(router.query.type !== "Fern" && (plant_details.acf.characteristics.bloom_time || 
                 plant_details.acf.characteristics.flower_colour.length !== 0 || plant_details.acf.characteristics.inflorescence.length !== 0 ||
                 plant_details.acf.characteristics.number_flowers || plant_details.acf.characteristics.number_petals ||
                 plant_details.acf.characteristics.petal_symmetry.length !== 0 || plant_details.acf.characteristics.lip_shape.length !== 0 ||
                 plant_details.acf.characteristics.lip_description  || plant_details.acf.characteristics.nectar_spur ||
                 plant_details.acf.characteristics.flower_description || plant_details.acf.characteristics.stipule_shape || 
                 plant_details.acf.characteristics.stems.length !== 0 
                 ))
                && (
                  <div className="accordion mb-3" id="accordion1">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne">
                          <strong>Flowers</strong>
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordion1">
                        <div className="accordion-body">
                          <div className="d-flex flex-wrap">
                            {plant_details.acf.characteristics.bloom_time && (
                              <div className="d-flex label-value-section">
                                <p>
                                  <strong>Bloom Time: &nbsp;</strong>
                                  {plant_details.acf.characteristics.bloom_time}
                                </p>
                              </div>
                            )}

                            {plant_details.acf.characteristics.flower_colour
                              .length !== 0 && (
                              <div className="d-flex label-value-section">
                                <p>
                                  <strong>Flower Colour: &nbsp;</strong>
                                </p>
                                {plant_details.acf.characteristics.flower_colour.map(
                                  (item, index) => (
                                    <div className="d-flex" key={index}>
                                      <p>
                                        {api.capitalizeFirstLetter(item)}
                                        {item !==
                                        plant_details.acf.characteristics.flower_colour
                                          .slice(-1)
                                          .pop() ? (
                                          <span>, &nbsp;</span>
                                        ) : (
                                          ""
                                        )}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                            {plant_details.acf.characteristics.inflorescence
                            .length !== 0 && (
                            <div className="d-flex label-value-section">
                              <p>
                                <strong>Flower Arrangement: &nbsp;</strong>
                              </p>
                              {plant_details.acf.characteristics.inflorescence.map(
                                (item, index) => (
                                  <div className="d-flex" key={index}>
                                    <p>
                                      {api.capitalizeFirstLetter(item)}
                                      {item !==
                                      plant_details.acf.characteristics.inflorescence
                                        .slice(-1)
                                        .pop() ? (
                                        <span>, &nbsp;</span>
                                      ) : (
                                        ""
                                      )}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                              {plant_details.acf.characteristics
                                .petal_symmetry !== 0 &&
                                plant_details.acf.characteristics.petal_symmetry.map(
                                  (item, index) => (
                                    <div
                                      className="d-flex label-value-section"
                                      key={index}>
                                      <p>
                                        <strong>Petal Symmetry: &nbsp;</strong>
                                      </p>
                                      <div>
                                        <p>
                                          {api.capitalizeFirstLetter(item)}
                                          &nbsp;
                                        </p>
                                      </div>
                                    </div>
                                  )
                              )}
                            {plant_details.acf.characteristics
                              .number_flowers && (
                              <div className="d-flex label-value-section">
                                <p>
                                  <strong>Number Flowers: &nbsp;</strong>
                                  {
                                    plant_details.acf.characteristics
                                      .number_flowers
                                  }
                                </p>
                              </div>
                            )}
                            {plant_details.acf.characteristics
                              .number_rays && (
                              <div className="d-flex label-value-section">
                                <p>
                                  <strong>Number Rays: &nbsp;</strong>
                                  {
                                    plant_details.acf.characteristics
                                      .number_rays
                                  }
                                </p>
                              </div>
                            )}
                            {plant_details.acf.characteristics
                              .number_petals && (
                              <div className="d-flex label-value-section">
                                <p>
                                  <strong>Number Petals: &nbsp;</strong>
                                  {
                                    plant_details.acf.characteristics
                                      .number_petals
                                  }
                                </p>
                              </div>
                            )}
                            {plant_details.acf.characteristics.lip_shape
                              .length !== 0 &&
                              plant_details.acf.characteristics.lip_shape.map(
                                (item, index) => (
                                  <div
                                    className="d-flex label-value-section"
                                    key={index}>
                                    <p>
                                      <strong>Lip Shape: &nbsp;</strong>
                                    </p>
                                    <div>
                                      <p>
                                        {api.capitalizeFirstLetter(item)}
                                        &nbsp;
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
                            {plant_details.acf.characteristics
                              .lip_description && (
                              <div className="d-flex label-value-section">
                                <p>
                                  <strong>Lip Description: &nbsp;</strong>
                                  {
                                    plant_details.acf.characteristics
                                      .lip_description
                                  }
                                </p>
                              </div>
                            )}
                            {plant_details.acf.characteristics.nectar_spur && (
                              <div className="d-flex label-value-section">
                                <p>
                                  <strong>Nectar Spur: &nbsp;</strong>
                                </p>
                                {plant_details.acf.characteristics.nectar_spur}
                              </div>
                            )}
                            {plant_details.acf.characteristics.stipule_shape && (
                              <div className="d-flex label-value-section">
                                <p>
                                  <strong>Stipule Shape: &nbsp;</strong>
                                </p>
                                {api.capitalizeFirstLetter(plant_details.acf.characteristics.stipule_shape)}
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                              {plant_details.acf.characteristics.flower_description && (
                                <div >
                                  <p>
                                    <strong>Flower Description: &nbsp;</strong>
                                  </p>
                                  <div className="rtc-content">
                                    {ReactHtmlParser(plant_details.acf.characteristics.flower_description)}
                                  </div>
                                </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LEAVES */}
                { ( plant_details.acf.characteristics.leaf_duration.length !== 0 || plant_details.acf.characteristics.leaf_type.length !== 0 ||
                  plant_details.acf.characteristics.leaf_arrangement.length !== 0 || plant_details.acf.characteristics.leaf_blade_edges.length !== 0 ||
                  plant_details.acf.characteristics.leaf_shape.length !== 0 || plant_details.acf.characteristics.leaf_number || 
                  plant_details.acf.characteristics.leaflet_divisions.length !==0  || plant_details.acf.characteristics.leaves_per_node || 
                  plant_details.acf.characteristics.leaf_description) &&
                <div className="accordion mb-3" id="accordion2">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        // aria-expanded="true"
                        aria-controls="collapseTwo">
                        <strong>Leaves</strong>
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse show"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordion2">
                      <div className="accordion-body">
                        <div className="d-flex flex-wrap">
                          {plant_details.acf.characteristics.leaf_duration
                            .length !== 0 &&
                            plant_details.acf.characteristics.leaf_duration.map(
                              (item, index) => (
                                <div
                                  className="d-flex label-value-section"
                                  key={index}>
                                  <p>
                                    <strong>Leaf Duration: &nbsp;</strong>
                                  </p>
                                  <div>
                                    <p>
                                      {api.capitalizeFirstLetter(item)}
                                      &nbsp;
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                          {plant_details.acf.characteristics.leaf_type
                            .length !== 0 &&
                            plant_details.acf.characteristics.leaf_type.map(
                              (item, index) => (
                                <div
                                  className="d-flex label-value-section"
                                  key={index}>
                                  <p>
                                    <strong>Leaf Type: &nbsp;</strong>
                                  </p>
                                  <div>
                                    <p>
                                      {api.capitalizeFirstLetter(item)}
                                      &nbsp;
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                          {plant_details.acf.characteristics.leaf_arrangement
                            .length !== 0 &&
                            plant_details.acf.characteristics.leaf_arrangement.map(
                              (item, index) => (
                                <div
                                  className="d-flex label-value-section"
                                  key={index}>
                                  <p>
                                    <strong>Leaf Arrangement: &nbsp;</strong>
                                  </p>
                                  <div>
                                    <p>
                                      {api.capitalizeFirstLetter(item)}
                                      &nbsp;
                                    </p>
                                  </div>
                                </div>
                              )
                            )}

                          {plant_details.acf.characteristics.leaf_blade_edges
                            .length !== 0 && (
                            <div className="d-flex label-value-section">
                              <p>
                                <strong>Leaf Edge: &nbsp;</strong>
                              </p>
                              {plant_details.acf.characteristics.leaf_blade_edges.map(
                                (item, index) => (
                                  <div className="d-flex" key={index}>
                                    <p>
                                      {api.capitalizeFirstLetter(item)}
                                      {item !==
                                      plant_details.acf.characteristics.leaf_blade_edges
                                        .slice(-1)
                                        .pop() ? (
                                        <span>, &nbsp;</span>
                                      ) : (
                                        ""
                                      )}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          )}

                          {plant_details.acf.characteristics.leaf_shape
                            .length !== 0 && (
                            <div className="d-flex label-value-section">
                              <p>
                                <strong>Leaf Shape: &nbsp;</strong>
                              </p>
                              {plant_details.acf.characteristics.leaf_shape.map(
                                (item, index) => (
                                  <div className="d-flex" key={index}>
                                    <p>
                                      {api.capitalizeFirstLetter(item)}
                                      {item !==
                                      plant_details.acf.characteristics.leaf_shape
                                        .slice(-1)
                                        .pop() ? (
                                        <span>, &nbsp;</span>
                                      ) : (
                                        ""
                                      )}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          )}

                          {plant_details.acf.characteristics.leaf_number && (
                            <div className="d-flex label-value-section">
                              <p>
                                <strong>Leaf Number: &nbsp;</strong>
                              </p>
                              {plant_details.acf.characteristics.leaf_number}
                            </div>
                          )}
                          {plant_details.acf.characteristics
                            .leaflet_divisions.length>0 && (
                            <div className="d-flex label-value-section">
                              <p>
                                <strong>Leaflet Divisions: &nbsp;</strong>
                              </p>
                              {
                                plant_details.acf.characteristics
                                  .leaflet_divisions
                              }
                            </div>
                          )}
                          {plant_details.acf.characteristics
                            .leaves_per_node && (
                            <div className="d-flex label-value-section">
                              <p>
                                <strong>Leaves Per Node: &nbsp;</strong>
                              </p>
                              {
                                plant_details.acf.characteristics
                                  .leaves_per_node
                              }
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                            {plant_details.acf.characteristics.leaf_description && (
                              <div >
                                <p>
                                  <strong>Leaves Description: &nbsp;</strong>
                                </p>
                                <div className="rtc-content">
                                  {ReactHtmlParser(plant_details.acf.characteristics.leaf_description)}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}

            {/* FRUITS */}
            {(router.query.type !== "Fern" && (plant_details.acf.characteristics.fruit_type.length !== 0 || plant_details.acf.characteristics.fruit_length ||
                  plant_details.acf.characteristics.fruit_color.length !== 0 || plant_details.acf.characteristics.seed_dispersal) )&& (
                              <div className="accordion mb-3" id="accordion3">
                                <div className="accordion-item">
                                  <h2 className="accordion-header" id="headingThree">
                                    <button
                                      className="accordion-button"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseThree"
                                      aria-expanded="true"
                                      aria-controls="collapseThree">
                                      <strong>Fruits</strong>
                                    </button>
                                  </h2>
                                  <div
                                    id="collapseThree"
                                    className="accordion-collapse show"
                                    aria-labelledby="headingThree"
                                    data-bs-parent="#accordion3">
                                    <div className="accordion-body">
                                      <div className="d-flex flex-wrap">
                                        {plant_details.acf.characteristics.fruit_type
                                          .length !== 0 &&
                                          plant_details.acf.characteristics.fruit_type.map(
                                            (item, index) => (
                                              <div
                                                className="d-flex label-value-section"
                                                key={index}>
                                                <p>
                                                  <strong>Fruit Type: &nbsp;</strong>
                                                </p>
                                                <div>
                                                  <p>
                                                    {api.capitalizeFirstLetter(item)} &nbsp;
                                                  </p>
                                                </div>
                                              </div>
                                            )
                                          )}
                                        {plant_details.acf.characteristics.fruit_length && (
                                          <div className="d-flex label-value-section">
                                            <p>
                                              <strong>Fruit Size: &nbsp;</strong>
                                            </p>
                                            {api.capitalizeFirstLetter(
                                              plant_details.acf.characteristics.fruit_length
                                            )}
                                          </div>
                                        )}
                                        {plant_details.acf.characteristics.fruit_color
                                            .length !== 0 && (
                                              <div className="d-flex label-value-section">
                                                <p>
                                                  <strong>Fruit Colour: &nbsp;</strong>
                                                </p>
                                                {plant_details.acf.characteristics.fruit_color.map(
                                                  (item, index) => (
                                                    <div className="d-flex" key={index}>
                                                      <p>
                                                        {api.capitalizeFirstLetter(item)}
                                                        {item !==
                                                          plant_details.acf.characteristics.fruit_color
                                                            .slice(-1)
                                                            .pop() ? (
                                                          <span>, &nbsp;</span>
                                                        ) : (
                                                          ""
                                                        )}
                                                      </p>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            )}
                                          {plant_details.acf.characteristics.seed_dispersal && (
                                            <div className="d-flex label-value-section">
                                              <p>
                                                <strong>Seed Dispersal: &nbsp;</strong>
                                              </p>
                                              {api.capitalizeFirstLetter(
                                                plant_details.acf.characteristics.seed_dispersal 
                                              )}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                {/* SPORES */}
                {(router.query.type == "Fern" &&(plant_details.acf.characteristics.spore_description || plant_details.acf.characteristics.spore_location.length !== 0 ||
                  plant_details.acf.characteristics.spore_shape.length !== 0 ||  plant_details.acf.characteristics.spore_covering.length !== 0  ||
                  plant_details.acf.characteristics.spore_under_leaf.length !== 0 ) ) && (
                  <div className="accordion mb-3" id="accordion3">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          // aria-expanded="true"
                          aria-controls="collapseThree">
                          <strong>Spores</strong>
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse show"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordion3">
                        <div className="accordion-body">
                          <div className="d-flex flex-wrap">
                            {plant_details.acf.characteristics.spore_location
                              .length !== 0 &&
                              plant_details.acf.characteristics.spore_location.map(
                                (item, index) => (
                                  <div
                                    className="d-flex label-value-section"
                                    key={index}>
                                    <p>
                                      <strong>Spore Location: &nbsp;</strong>
                                    </p>
                                    <div>
                                      <p>
                                        {api.capitalizeFirstLetter(item)}
                                        &nbsp;
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
                            {plant_details.acf.characteristics.spore_shape
                              .length !== 0 &&
                              plant_details.acf.characteristics.spore_shape.map(
                                (item, index) => (
                                  <div
                                    className="d-flex label-value-section"
                                    key={index}>
                                    <p>
                                      <strong>Spore Shape: &nbsp;</strong>
                                    </p>
                                    <div>
                                      <p>
                                        {api.capitalizeFirstLetter(item)}
                                        &nbsp;
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
                            {plant_details.acf.characteristics.spore_covering
                                .length !== 0 &&
                                plant_details.acf.characteristics.spore_covering.map(
                                  (item, index) => (
                                    <div
                                      className="d-flex label-value-section"
                                      key={index}>
                                      <p>
                                        <strong>Spore Covering: &nbsp;</strong>
                                      </p>
                                      <div>
                                        <p>
                                          {api.capitalizeFirstLetter(item)}
                                          &nbsp;
                                        </p>
                                      </div>
                                    </div>
                                  )
                                )}
                                 {plant_details.acf.characteristics.spore_under_leaf
                                .length !== 0 &&
                                plant_details.acf.characteristics.spore_under_leaf.map(
                                  (item, index) => (
                                    <div
                                      className="d-flex label-value-section"
                                      key={index}>
                                      <p>
                                        <strong>Spore Position: &nbsp;</strong>
                                      </p>
                                      <div>
                                        <p>
                                          {api.capitalizeFirstLetter(item)}
                                          &nbsp;
                                        </p>
                                      </div>
                                    </div>
                                  )
                                )}
                          </div>
                          <div className="mb-3">
                              {plant_details.acf.characteristics.spore_description && (
                                <div >
                                  <p>
                                    <strong>Spore Description: &nbsp;</strong>
                                  </p>
                                  <div className="rtc-content">
                                    {ReactHtmlParser(plant_details.acf.characteristics.spore_description)}
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {plant_details.acf.characteristics.stems
                              .length !== 0 && (
                              <div className="d-flex label-value-section">
                                <p>
                                  <strong>Stems and/or Twigs: &nbsp;</strong>
                                </p>
                                {plant_details.acf.characteristics.stems.map(
                                  (item, index) => (
                                    <div className="d-flex" key={index}>
                                      <p>
                                        {api.capitalizeFirstLetter(item)}
                                        {index + 1 === plant_details.acf.characteristics.stems.length ? '' : ","} &nbsp;
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                )}

                {plant_details.acf.characteristics.position_of_hairs && (
                  <div className="d-flex">
                    <p>
                      <strong>Position of Hairs: &nbsp;</strong>
                      {plant_details.acf.characteristics.position_of_hairs}
                    </p>
                  </div>
                )}
                {plant_details.acf.varieties && (
                <div>
                  <p>
                    <strong>Varieties, Subspecies, and Hybrids: &nbsp;</strong>
                  </p>
                  <div className="d-flex flex-column">
                    <div className="rtc-content">
                      {ReactHtmlParser(plant_details.acf.varieties)}
                    </div>
                  </div>
                </div>
               )}
                {/* {plant_details.acf.characteristics.wildlife_benefits && (
                  <div className="d-flex label-value-section">
                    <p>
                      <strong>Wildlife Benefits: &nbsp;</strong>
                    </p>
                    {plant_details.acf.characteristics.wildlife_benefits}
                  </div>
                )} */}
                <div className="mb-3">
                  {/* {plant_details.acf.characteristics.uses && (
                    <div className="d-flex flex-column">
                      <p>
                        <strong>Uses: </strong>
                      </p>
                      <div className="rtc-content">
                        {ReactHtmlParser(plant_details.acf.uses)}
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-12 d-flex align-items-center justify-content-center">
            <div className="loader d-flex align-items-center">
              <img src="../../images/loading.gif" alt="loader" />
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .heading {
          font-size: 2rem;
          color: #0e9d47;
        }
        .content-section {
          background-color: #ffffff;
          margin: 15px 0px;
        }
        .img-container {
          border-radius: 12px;
          margin: 2px;
          overflow: hidden;
          border: 1px solid #e0e1e3;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .featured-img-container {
          border-radius: 12px;
          margin: 5px;
          width: 410px;
          height: 250px;
          overflow: hidden;
          border: 1px solid #e0e1e3;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
        .loader {
          height: 300px;
          img {
            width: 80px;
          }
        }
        .label-value-section {
          /* Large screens (1405px upwards) */
          @media only screen and (min-width: 1405px) {
            width: 50%;
          }
          /*Retina MacBook pro*/
          @media only screen and (-webkit-min-device-pixel-ratio: 1.5),
            only screen and (min-device-pixel-ratio: 1.5) {
            width: 50%;
          }

          /* iPhones media query 2436x1125px at 458ppi */
          @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
            width: 100%;
          }

          /* Smartphones in portrait mode (0-479px) */
          @media only screen and (max-width: 479px) {
            width: 100%;
          }

          /* ----------- iPad Pro ----------- */
          /* Portrait and Landscape */
          @media only screen and (min-width: 1024px) and (max-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) {
            width: 100%;
          }
        }
        .each-slide > div {
          display: flex;
          align-items: center;
          justify-content: center;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          height: 75vh;
        }

        .each-slide span {
          padding: 20px;
          font-size: 20px;
          background: #efefef;
          text-align: center;
        }
        .img-tabs:hover {
          cursor: pointer;
        }
        .hide {
          display: none;
        }
        .stock-img-container {
          width: 100%;
          border: 1px solid #e0e1e3;
          border-radius: 8px;

          img {
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
        }
        .familyLink{
          color: #0e9d47;
          font-style: italic;
          font-weight: bold;
          cursor: pointer
        }
        .slider {
          position: relative;
          h2[name="prev"]:hover,
          h2[name="next"]:hover {
            cursor: pointer;
          }
          h2[name="prev"] {
            position: absolute;
            left: 1%;
            top: 45%;
          }
          h2[name="next"] {
            position: absolute;
            right: 1%;
            top: 45%;
          }
        }
        .rtc-content {
          background-color: #f6f7f9;
          padding: 15px 20px;
          border-radius: 10px;
          font-size: 15px;
        }
        .side-bar {
          background-color: #ffffff;
          padding: 12px 10px;
          border-radius: 10px;
        }
        .featured-image {
          overflow: hidden;
          img {
            border-radius: 10px;
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
        }
        .unique-characteristics {
          margin-left: 10px;
          font-size: 14px;
          :global(ol) {
            padding: 0px !important;
          }
        }
        .featured-image:hover {
          cursor: pointer;
        }
        .modal-image-container {
          img {
            width: 100%;
            height: 80vh;
          }
        }
        .accordion-button:not(.collapsed) {
          color: #1d9d47;
          background-color: #f8f9fa;
        }
        .accordion-button:not(.collapsed)::after {
          filter: invert(13%) sepia(68%) saturate(2891%) hue-rotate(346deg)
            brightness(104%) contrast(97%);
          -webkit-filter: invert(13%) sepia(68%) saturate(2891%)
            hue-rotate(346deg) brightness(104%) contrast(97%);
          -ms-filter: invert(13%) sepia(68%) saturate(2891%) hue-rotate(346deg)
            brightness(104%) contrast(97%);
        }
        .accordion-button {
          padding: 0.5rem 1.25rem;
          background-color: #f8f9fa;
        }
        .img-caption {
          margin: 0px;
          text-align: right;
        }
        .back-arrow {
          h4,
          p,
          h4:hover,
          p:hover {
            cursor: pointer;
            color: #167a37;
          }
        }
        .view-more {
          cursor: pointer;
          font-weight: bold;
          text-align: right;
          color: #0e9d47;
        }
        .grey-dot {
          height: 10px;
          width: 10px;
          background-color: grey;
          border-radius: 48%;
          display: inline-block;
          margin-right: 5px;
        }
        .green-dot {
          height: 10px;
          width: 10px;
          background-color: green;
          border-radius: 48%;
          display: inline-block;
          margin: 0 5px;
        }
      `}</style>
    </div>
    <Footer />
    </>
  )
}

export default PlantSpeciesDetails