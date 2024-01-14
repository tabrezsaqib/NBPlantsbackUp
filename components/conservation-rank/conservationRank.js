/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Router from "next/router"
import styles from "../../styles/SearchResults.module.css"
import * as api from "../../generics/api"
const API_URL = process.env.API_URL
const API_POST_URL = process.env.API_POST_URL

const ConservationRank = () => {
    const [plantFamily, setPlantFamily] = useState({});
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        fetchDetails();
    }, [])

    const fetchDetails = async () => {
        const response = await api.get(`${API_URL}plants_db`)
        let arr = []
        for (let i = 0; i < response.data.length; i++) {
            arr.push(...response.data[i].acf.conservation_rank)
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
                Router.reload()
            })
        }
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
                Object.keys(plantFamily).length > 0 &&
                <div style={{ margin: '10px', height: '65vh' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Conservation Rank</h2>
                    <div className="row " >
                        {plantFamily.map((family, i) => (
                            <>  <div key={i} className="listOfPlants  col-sm-12 col-md-12  col-lg-12">
                                <span className="familyLink"
                                    onClick={() => loadPlantFamily(family)}>

                                    {api.capitalizeFirstLetter(formatCase(capitalizeAfterColon(family)))}
                                </span>
                            </div></>))
                        }</div>
                </div>}
            <style jsx>{`
        .familyLink {
            color: #0e9d47;
            font-style: italic;
            font-weight:bold;
            margin-right: 8px;
            cursor: pointer
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