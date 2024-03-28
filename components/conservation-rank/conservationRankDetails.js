/* eslint-disable camelcase */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-nested-ternary */

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import TablePagination from '@mui/material/TablePagination';
import { useSelector } from "react-redux";
import * as api from "../../generics/api";
import ListPlantSpecies from '../main/ListPlantSpecies'
import styles from "../../styles/SearchResults.module.css"
import BrokenPageAlert from "../../generics/brokenPageAlert";



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
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < all_plants.length; i++) {
                if (all_plants[i].acf.conservation_rank.includes(char))
                    arr.push(all_plants[i])
            }
        } catch (error) {
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
                        <div className="d-flex flex-column mt-2">
                            <div className="d-flex">
                                <h2 className="heading">
                                    <i>{api.capitalizeFirstLetter(formatCase(capitalizeAfterColon(router.query.keyword)))}</i>
                                </h2>
                            </div>
                        </div>
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