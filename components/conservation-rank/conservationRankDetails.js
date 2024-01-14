/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import * as api from "../../generics/api";
import ReactHtmlParser from "react-html-parser"
import { useRouter } from 'next/router'
import ListPlantSpecies from '../main/ListPlantSpecies'
import styles from "../../styles/SearchResults.module.css"
import TablePagination from '@mui/material/TablePagination';

const SEARCH_URL = process.env.SEARCH_URL

const ConservationRankDetails = ({ plant_id }) => {
    const [plantFamily, setPlantFamily] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchDetails(router.query.keyword, newPage, rowsPerPage)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
        fetchDetails(router.query.keyword, 0, parseInt(event.target.value, 10))
    };

    useEffect(() => {
        async function fetch() {
            if (!router.isReady) return
            if (router.query.keyword) {
                fetchDetails(router.query.keyword, page, rowsPerPage);
            }
        }
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, router.isReady, router.query.keyword])

    const fetchDetails = async (char, pg, rpg) => {
        setLoading(true)
        const response = await api.get(`${SEARCH_URL}search?keyword=${char}&per_page=${rpg}&page=${pg}`)
        setLoading(false)
        const filtered = response.data.filter((res) => { console.log(res.acf.conservation_rank); if (res.acf.conservation_rank) return res.acf.conservation_rank.includes(char) })
        setPlantFamily(filtered)
    }

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
                </div>) :
                <div style={{ margin: '10px' }}>
                    <>
                        <div className="d-flex flex-column mt-2">
                            <div className="d-flex">
                                <h2 className="heading">
                                    <i>{api.capitalizeFirstLetter(formatCase(capitalizeAfterColon(router.query.keyword)))}</i>
                                </h2>
                            </div>
                        </div> </>
                    {plantFamily.length > 0 ?
                        <ListPlantSpecies filteredList={plantFamily} isLoading={isLoading} /> :
                        <div className="NoData">No Data. Site in progress. All species may not be available yet.</div>}
                    <div className="d-flex">
                        <TablePagination
                            component="div"
                            count={-1}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            showFirstButton
                            showLastButton
                            labelRowsPerPage="Species Per Page:"
                            rowsPerPageOptions={[20, 30, 50]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{ padding: 0 }}
                        /></div>
                    <div className="site-in-progress">
                        Site in progress. All species may not be available yet.
                    </div>
                </div>}
            <style jsx>{`
        .heading {
          font-size: 2rem;
          color: #0e9d47;
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