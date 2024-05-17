/* eslint-disable camelcase */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-nested-ternary */

import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useRouter } from 'next/router'
import TablePagination from '@mui/material/TablePagination';
import { useSelector } from "react-redux";
import * as api from "../../generics/api";
import ListPlantSpecies from '../main/ListPlantSpecies'
import styles from "../../styles/SearchResults.module.css"
import BrokenPageAlert from "../../generics/brokenPageAlert";

import ReactHtmlParser from "react-html-parser"

function ClampedDiv({ children }) {
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
                <div className="moreLink" onClick={() => setOpen(true)}>Read more</div>
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

function ConservationRankDetails() {
    const [plantFamily, setPlantFamily] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const { all_plants } = useSelector(state => state.post)

    const handleChangePage = (event, newPage) => {
       setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const fetchDetails = async (char) => {
        setLoading(true)
        const arr = []
        try {
            if (char === "Invasive") {
                console.log(all_plants)
                for (let i = 0; i < all_plants.length; i++) {
                    if (all_plants[i].acf.characteristics.invasive)
                        arr.push(all_plants[i])
                }
            } else {
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < all_plants.length; i++) {
                    if (all_plants[i].acf.conservation_rank.includes(char))
                        arr.push(all_plants[i])
                }
            }
        } catch (error) {
            console.log(error)
            setIsError(true)
        }

        setLoading(false)
        setPlantFamily(arr)
    }

    useEffect(() => {
        async function fetch() {
            if (!router.isReady) return
            if (router.query.keyword) {
                fetchDetails(router.query.keyword);
            }
        }
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, router.isReady, router.query.keyword])

    const formatCase = (data) => {
        if (data.search('sna') >= 0 || data.search('Sna') >= 0) {
            return data.replace(/sna/ig, 'SNA')
        } else {
            return data
        }
    }

    const capitalizeAfterColon = (inputString) => {
        return inputString.replace(/(:\s*\w)/g, match => match.toUpperCase());
    }

    return (
        <>
            {isLoading ? (
                <div className={[styles.imgContainer, "d-flex", 'center-align'].join(" ")}>
                    <img className={styles.imgContent} src="../../images/loading.gif" alt="loader" />
                </div>) :  isError ? <div style={{ margin: '5% 15% 20%' }}><BrokenPageAlert />  </div> :
                plantFamily.length > 0 ?
                <div style={{ margin: '10px' }}>
                        <div className="d-flex justify-content-between">
                        <h2 className="heading">
                            {router.query.keyword === 'Invasive' ? <div>{api.capitalizeFirstLetter(router.query.keyword)}  Plants</div> :
                            <i> {api.capitalizeFirstLetter(formatCase(capitalizeAfterColon(router.query.keyword)))} </i>}
                        </h2>
                        <a className="d-flex back-arrow" style={{ cursor: 'pointer', color:'#0e9d47' }} onClick={() => router.back()}>
                            <h4>
                                <i className="bi bi-arrow-left"></i>
                            </h4>
                            <p>&nbsp;Other Conservation Ranks</p>
                        </a>
                    </div>
                    {router.query.keyword === 'Invasive' && <div className="d-flex flex-column">
                        <div style={{ backgroundColor: '#f6f7f9', padding: '15px', borderRadius: '10px' }}>
                            Plants that have been “accidentally or deliberately introduced into ecosystems beyond their native range and whose introduction or spread
                            negatively impacts the environment, economy, and/or society including human health.” -
                            <a style={{color:'#0e9d47'}} href="https://www.nbinvasives.ca/" target="_blank">  <img style={{height:'30px', marginLeft:'10px'}} src="https://images.squarespace-cdn.com/content/v1/6144adb9289b694822c3db7b/d90bd94b-def7-4184-8aad-f84ffec19e9b/favicon.ico?format=100w"/>
                             <i> New Brunswick Invasive Species Council</i></a>
                        </div>
                    </div>}
                    {plantFamily.length > 0 ?
                        <ListPlantSpecies filteredList={plantFamily} pg={page} rpg={rowsPerPage} isLoading={isLoading} /> :
                        <div className="NoData">No Data. Site in progress. Not all species are available yet.</div>}
                    <div className="d-flex">
                        <TablePagination
                            component="div"
                            count={plantFamily.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            showFirstButton
                            showLastButton
                            labelRowsPerPage="Species Per Page:"
                            rowsPerPageOptions={[20, 50, 100]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{ 
                                padding: 0
                            }}
                        /></div>
                    <div className="site-in-progress">
                        Site in progress. Not all species are available yet.
                    </div>
                </div>: ''}
            <style jsx>{`
        .heading {
          font-size: 2rem;
          color: #0e9d47;
        }
        .MuiTablePagination-displayedRows{
            display: none;
        }
        .NoData{
            text-align: center;
            font-size: x-large;
            margin: 7%;
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

export default ConservationRankDetails