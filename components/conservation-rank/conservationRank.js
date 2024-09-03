/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */

import React, { useEffect, useState } from "react";
import Router from "next/router"
import { useSelector } from "react-redux";
import styles from "../../styles/SearchResults.module.css"
import * as api from "../../generics/api"


function ConservationRank() {
    const [plantFamily, setPlantFamily] = useState({});
    const [isLoading, setLoading] = useState(true)
    const { all_plants } = useSelector(state => state.post)
    

    const fetchDetails = async () => {
        const arr = []
        for (let i = 0; i < all_plants.length; i++) {
            arr.push(...all_plants[i].acf.conservation_rank)
        }
        const uniqueArr = new Set(arr)
        const sortedArr = [...uniqueArr].sort();
        setLoading(false)
        setPlantFamily(sortedArr);
    }

    const loadPlantFamily = async (param) => {
        if (param) {
            Router.push({
                pathname: "/conservationRankDetails",
                query: { keyword: param },
            }).then(() => {
            })
        }
    }
    useEffect(() => {
        if (all_plants.length > 0)
            fetchDetails();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [all_plants])

    const formatCase = (data) => {
        if (data.search('sna') >= 0 || data.search('Sna') >= 0) {
            return data.replace(/sna/ig, 'SNA')
        }
            return data
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
                Object.keys(plantFamily).length > 0 &&
                <div style={{ margin: '10px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Plants by Conservation Rank</h2>
                    <div className="row " >
                        {plantFamily.map((family, i) => (
                            <>  <div key={i} className="listOfPlants  col-sm-12 col-md-12  col-lg-12">
                                <span className="familyLink"
                                    onClick={() => loadPlantFamily(family)}>

                                    {api.capitalizeFirstLetter(formatCase(capitalizeAfterColon(family)))}
                                </span>
                            </div></>))
                        }
                        <div className="listOfPlants  col-sm-12 col-md-12  col-lg-12">
                            <span className="invasiveLink"
                                onClick={() => loadPlantFamily("Invasive")}>
                                Invasive Species
                            </span>
                        </div>
                     </div>
                </div>}
            <style jsx>{`
        .familyLink {
            color: #0e9d47;
            font-style: italic;
            font-weight:bold;
            margin-right: 8px;
            font-size: 23px;
            cursor: pointer
        }
        .invasiveLink {
            color: #0e9d47;
            font-weight:bold;
            font-size: 2rem;
            margin-right: 8px;
            cursor: pointer;
        }
        .center-align{
            margin-left: 50%;
        }
        .listOfPlants{
            text-align:center;
            margin: 10px 0;
        }`}</style>
        </>
    )
}

export default ConservationRank