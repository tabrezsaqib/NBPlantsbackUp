/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable camelcase */

import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser"

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "../../styles/SearchResults.module.css"
import { DialogContent, DialogActions, Button, Divider, Stack, IconButton } from "@mui/material";
import { Close, Print } from "@mui/icons-material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SortIcon from '@mui/icons-material/Sort'

function PlantListModal({ openModal, handleModal }) {
    const [isLoading, setLoading] = useState(false)
    const { filteredPlantList } = useSelector(state => state.post)
    const [alignment, setAlignment] = React.useState('latin');
    const [plantList, setPlantList] = React.useState([]);
    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    useEffect(() => {
        if (alignment === 'latin')
            setPlantList(filteredPlantList)
        else {
            let arr = [...filteredPlantList]
            let a = arr.sort((a, b) => {
                const nameA = a.acf.common_name.trim().toUpperCase(); // ignore upper and lowercase
                const nameB = b.acf.common_name.trim().toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
            setPlantList(a)
        }
    }, [alignment])
   

    return (
        <>
            <Dialog onClose={handleModal} open={openModal} maxWidth="md" className="printDialog">
                <DialogTitle sx={{ pr: 0 }}>
                    <Stack direction="row" justifyContent="space-between">
                        <div>
                            Plants List
                        </div>
                        <div>
                            <span className="sortBy" > Sort By:</span>
                            <ToggleButtonGroup
                                size="small"
                                color="success"
                                value={alignment}
                                exclusive
                                onChange={handleChange}
                                aria-label="Platform"
                                sx={{ display: 'contents' }}
                            >
                                <ToggleButton sx={{ textTransform: 'none', fontWeight: '600' }} value="latin"><SortIcon />Latin Name</ToggleButton>
                                <ToggleButton sx={{ textTransform: 'none', fontWeight: '600' }} value="english"><SortIcon />English Name</ToggleButton>
                            </ToggleButtonGroup>
                            <Button  sx={{displayPrint: 'none', ml: '10px'}} color="success"  variant="contained" endIcon={<Print />} onClick={() => { window.print() }}>
                                Print
                            </Button>
                            <IconButton sx={{ ml: '10px',displayPrint: 'none' }} aria-label="close" onClick={handleModal}>
                                <Close />
                            </IconButton>
                        </div>
                    </Stack></DialogTitle>
                <DialogContent>
                    {isLoading ? (
                        <div className={[styles.imgContainer, "d-flex", 'center-align'].join(" ")}>
                            <img className={styles.imgContent} src="../../images/loading.gif" alt="loader" />
                        </div>) :
                        plantList.length > 0 &&
                        <div style={{ margin: '10px' }}>

                            <div className="row " >
                                {plantList.map((family, i) => (
                                    <>  <div key={i} className="listOfPlants  col-sm-12 col-md-6  col-lg-6 ">
                                        <Link legacyBehavior
                                            href={{
                                                pathname: `/plants/${family.slug}`,
                                                query: { type: family.acf.plant_type },
                                            }}>
                                            <a className={ alignment === 'latin'? "familyLink" : "familyEnglish" }>  { alignment === 'latin'?  ReactHtmlParser(family.acf.latin): ReactHtmlParser(family.acf.common_name)}</a>
                                        </Link> /
                                        <Link legacyBehavior
                                            href={{
                                                pathname: `/plants/${family.slug}`,
                                                query: { type: family.acf.plant_type },
                                            }}>
                                            <a className={ alignment === 'latin'? "familyEnglish" : "familyLink" }>  { alignment === 'latin'?  ReactHtmlParser(family.acf.common_name): ReactHtmlParser(family.acf.latin)} </a>
                                        </Link>

                                    </div></>))
                                }</div>
                        </div>}
                </DialogContent>

                <Divider></Divider>
                <DialogActions>
                    <Button sx={{ color: '#0e9d47' ,displayPrint: 'none'}} onClick={handleModal}>Close</Button>
                </DialogActions>
            </Dialog>
            <style jsx>{`
            .familyLink {
                color: #0e9d47;
                font-style: italic;
                font-weight:bold;
                margin-right: 8px;
                cursor: pointer
            }
            .familyEnglish{
            margin-left:8px;
            cursor: pointer
            }
            .center-align{
                margin-left: 50%;
            }
            .listOfPlants{
                margin: 10px 0;
            }
            .sortBy{
                font-size:14px;
                margin-right:10px
            }
            @media print {
                .listOfPlants{
                    text-align:left;
                    margin: 10px 0;
                }
            .printDialog {
                    max-width: 100vw!important;
                }
            }`
            }</style>
        </>
    )
}

export default PlantListModal