/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */

import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import * as api from "../../generics/api";
import ReactHtmlParser from "react-html-parser"
import { useRouter } from 'next/router'
import ListPlantSpecies from '../main/ListPlantSpecies'
import styles from "../../styles/SearchResults.module.css"
import BrokenPageAlert from "../../generics/brokenPageAlert";

const {SEARCH_URL} = process.env

function ClampedDiv ({ children }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const [showLink, setShowLink] = useState(false);

    useLayoutEffect(() => {
        if (ref.current && ref.current.clientHeight > 30) {
            setShowLink(true)
        }
    }, [ref])

    let textClass = "text";
    if (open) {
        textClass += " open";
    }

    return <div className="rtc-content ">
        <div>
            <span className={textClass} ref={ref}>{children}</span>
            {showLink && !open && (
                <div className="moreLink" onClick={() => setOpen(true)}>...Read more</div>
            )}
        </div><style jsx>{`
        .text {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            max-height: calc(4 * 2.75 * 15px);
            font-size: 14px;
            line-height: 1.5;
          }
          .moreLink{
            cursor: pointer;
            -webkit-text-decoration: underline;
            text-decoration: underline;
            color: #0e9d47;
          }
          .open {
            -webkit-line-clamp: unset;
            max-height: none;
          }
          
          .container {
            background-color: crimson;
            color: white;
            margin-bottom: 15px;
            padding: 15px;
          }
        .site-in-progress{
          margin-top: 30px;
          margin-bottom:50px;
          text-align: center;
          font-size: 20px;
        }
        .center-align{
            margin-left: 50%;
        }
        .rtc-content {
          background-color: #f6f7f9;
          padding: 15px 20px;
          border-radius: 10px;
          font-size: 15px;
        }`}</style>
    </div>
}


function FamilyDetails ({ plant_id }) {
    const [plantFamily, setPlantFamily] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const router = useRouter()

    useEffect(() => {

        async function fetch() {
            if (plant_id) {
                const id = plant_id.split(',')
                const arr = []
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < id.length; i++) {
                    // eslint-disable-next-line no-await-in-loop, no-use-before-define
                    await fetchDetails(id[i], 'plant').then(
                        result => { if(result) arr.push(result[0]) })
                }
                setPlantFamily(arr)
            } else {
                if (!router.isReady) return
                if (router.query.keyword) {
                    fetchDetails(router.query.keyword);
                }
            }
        }
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, router.isReady, router.query.keyword])

    const fetchDetails = async (char, type) => {
        const response = await api.get(`${SEARCH_URL}search?keyword=${char.replace(/\s+/g, "")}&per_page=50`)
        setLoading(false)
        if (response) {
            try {

                if (type === 'plant') {
                    const filtered = response.data.filter((res) => res.acf.plantsnb_id === char.replace(/\s+/g, ""))
                    return filtered
                } 
                    response.data.shift();
                    setPlantFamily(response.data.length > 0 ? response.data : [])

            } catch (error) {
                setIsError(true)
            }
        } else {
            setIsError(true)
        }
        
    }

    return (
        <>
            {isLoading ? (
                <div className={[styles.imgContainer, "d-flex", 'center-align'].join(" ")}>
                    <img className={styles.imgContent} src="../../images/loading.gif" alt="loader" />
                </div>) : isError ? <div style={{ margin: '5% 15% 20%' }}><BrokenPageAlert />  </div> :
                plantFamily.length > 0 ?
                    <div style={{ margin: '10px' }}>
                        {!plant_id && <>
                        <div className="d-flex flex-column mt-2">
                            <div className="d-flex">
                                <h2 className="heading">
                                    <i>{ReactHtmlParser(plantFamily[0].acf.plant_family)}</i>
                                </h2>
                                <h4 className="align-self-center pt-2">
                                    <strong>
                                        &nbsp;&nbsp;
                                        {plantFamily[0].acf.family_english && plantFamily[0].acf.family_english}
                                    </strong>
                                </h4>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div>
                                <ClampedDiv>
                                    {ReactHtmlParser(plantFamily[0].acf.family_description)}
                                </ClampedDiv>
                                <ListPlantSpecies filteredList={plantFamily} isLoading={isLoading} />
                            </div>
                        </div></>}
                        {plant_id && <ListPlantSpecies filteredList={plantFamily} isLoading={isLoading} />}
                        {!plant_id &&
                        <div className="site-in-progress">
                            Site in progress. Not all species are available yet.
                        </div>}
                    </div> : ''}
            <style jsx>{`
        .heading {
          font-size: 2rem;
          color: #0e9d47;
        }
        .site-in-progress{
          margin-top: 30px;
          margin-bottom:50px;
          text-align: center;
          font-size: 20px;
        }
        .center-align{
            margin-left: 50%;
        }
        .rtc-content {
          background-color: #f6f7f9;
          padding: 15px 20px;
          border-radius: 10px;
          font-size: 15px;
        }`}</style>
        </>
    )
}

export default FamilyDetails