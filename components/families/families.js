/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable camelcase */

import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser"

import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "../../styles/SearchResults.module.css"

function Families() {
    const [plantFamily, setPlantFamily] = useState({});
    const [isLoading, setLoading] = useState(true)
    const { all_plants } = useSelector(state => state.post)

    const fetchDetails = async () => {
        const a = Object.groupBy(all_plants, data => (data.acf.plant_family));
        setLoading(false)
        setPlantFamily(a);
    }

    useEffect(() => {
        if (all_plants.length > 0)
            fetchDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [all_plants])

    

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
                                <Link href={`/plantFamilyDetails/?keyword=${plantFamily[family][0].acf.plant_family}`}
                                    as={`/plantFamilyDetails/?keyword=${plantFamily[family][0].acf.plant_family}`} legacyBehavior>
                                    <a className="familyLink">  {ReactHtmlParser(plantFamily[family][0].acf.plant_family)}</a>
                                </Link>
                                /
                                <Link href={`/plantFamilyDetails/?keyword=${plantFamily[family][0].acf.plant_family}`}
                                    as={`/plantFamilyDetails/?keyword=${plantFamily[family][0].acf.plant_family}`} legacyBehavior>
                                    <a className="familyEnglish">  {plantFamily[family][0].acf.family_english ? plantFamily[family][0].acf.family_english : '-'}</a>
                                </Link>
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
            cursor: pointer
        }`}</style>
        </>
    )
}

export default Families