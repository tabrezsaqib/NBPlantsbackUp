/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import * as api from "../../generics/api";
import ReactHtmlParser from "react-html-parser"
import { useRouter } from 'next/router'
import ListPlantSpecies from '../main/ListPlantSpecies'
import styles from "../../styles/SearchResults.module.css"
import Collapse from '@mui/material/Collapse';

const SEARCH_URL = process.env.SEARCH_URL

const API_POST_URL = process.env.API_POST_URL

const ClampedDiv = ({ children }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // This is where I'd do the line number calculation, but it's just
    // using a placeholder instead.
    const [showLink, setShowLink] = useState(false);

    useLayoutEffect(() => {
        console.log(ref.current.clientHeight)
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
};


const FamilyDetails = ({ plant_id }) => {
    const [plantFamily, setPlantFamily] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const router = useRouter()
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => { setIsReadMore(!isReadMore) };
    const [readMore, setReadMore] = useState(false);

    useEffect(() => {

        async function fetch() {
            if (plant_id) {
                let id = plant_id.split(',')
                console.log(id)
                let arr = []
                for (let i = 0; i < id.length; i++) {
                    await fetchDetails(id[i], 'plant').then(result => { arr.push(result[0]) })
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
        if (type === 'plant') {
            const filtered = response.data.filter((res) => res.acf.plantsnb_id === char.replace(/\s+/g, ""))
            return filtered
        } else {
            response.data.shift();
            setLoading(false)
            setPlantFamily(response.data.length > 0 ? response.data : [])
        }
    }

    return (
        <>
            {isLoading ? (
                <div className={[styles.imgContainer, "d-flex", 'center-align'].join(" ")}>
                    <img className={styles.imgContent} src="../../images/loading.gif" alt="loader" />
                </div>) :
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
                        {!plant_id &&
                        <div className="site-in-progress">
                            Site in progress. All species may not be available yet.
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