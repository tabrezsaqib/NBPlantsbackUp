/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser"
import Router from "next/router"
import Link from "next/link";
import styles from "../../styles/SearchResults.module.css"

import * as api from "../../generics/api"
const API_URL = process.env.API_URL

const Families = () => {
    const [plantFamily, setPlantFamily] = useState({});
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        fetchDetails();
    }, [])

    const fetchDetails = async () => {
        const response = await api.get(`${API_URL}plants_db`)
        const a = Object.groupBy(response.data, data => (data.acf.plant_family));
        setLoading(false)
        setPlantFamily(a);
    }

    const loadPlantFamily = async (param) => {
        if (param) {
            Router.push({
                pathname: "/plantFamilyDetails",
                query: { keyword: param },
            }).then(() => {
                Router.reload()
            })
        }
    }

    return (
        <>
            {isLoading ? (
                <div className={[styles.imgContainer, "d-flex", 'center-align'].join(" ")}>
                    <img className={styles.imgContent} src="../../images/loading.gif" alt="loader" />
                </div>) :
                Object.keys(plantFamily).length > 0 &&
                <div style={{ margin: '10px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Plant Families</h2>
                    <div className="row " >
                        {Object.keys(plantFamily).slice().sort().map((family, i) => (
                            <>  <div key={i} className="listOfPlants  col-sm-12 col-md-12  col-lg-6 ">
                                <span className="familyLink"
                                    onClick={() => loadPlantFamily(plantFamily[family][0]['acf']['plant_family'])}>
                                    {ReactHtmlParser(plantFamily[family][0]['acf']['plant_family'])}
                                </span>
                                /
                                <span className="familyEnglish">{plantFamily[family][0]['acf']['family_english'] ? plantFamily[family][0]['acf']['family_english'] : '-'}</span>
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
        }
        .familyEnglish{
            margin-left:8px;
        }`}</style>
        </>
    )
}

export default Families