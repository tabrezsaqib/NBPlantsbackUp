/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import * as api from "../../generics/api";
import ReactHtmlParser from "react-html-parser"
import { useRouter } from 'next/router'
import ListPlantSpecies from '../main/ListPlantSpecies'
import styles from "../../styles/SearchResults.module.css"

const SEARCH_URL = process.env.SEARCH_URL

const FamilyDetails = ({ plant_id }) => {
    const [plantFamily, setPlantFamily] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const router = useRouter()

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
                            <div className="rtc-content">
                                {ReactHtmlParser(plantFamily[0].acf.family_description)}
                            </div>
                        </div></>}
                        <div >
                            <ListPlantSpecies filteredList={plantFamily} isLoading={isLoading} />
                        </div>
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